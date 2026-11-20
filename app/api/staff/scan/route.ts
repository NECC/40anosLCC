import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";

async function getAuthorizedScannerUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      role: true,
      companyProfile: {
        select: { id: true, name: true, points: true, isActive: true },
      },
    },
  });

  if (!user || user.role === "USER") return null;

  return user;
}

// 1. GET: Devolve as opções permitidas consoante a role
export async function GET() {
  try {
    const scannerUser = await getAuthorizedScannerUser();
    if (!scannerUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Caso COMPANY: devolve apenas a sua banca
    if (scannerUser.role === "COMPANY") {
      if (!scannerUser.companyProfile || !scannerUser.companyProfile.isActive) {
        return NextResponse.json({
          role: "COMPANY",
          targets: [],
          warning: "Esta conta COMPANY ainda não tem uma empresa associada ou ativa.",
        });
      }

      return NextResponse.json({
        role: "COMPANY",
        targets: [
          {
            id: scannerUser.companyProfile.id,
            kind: "COMPANY" as const,
            title: `Banca ${scannerUser.companyProfile.name}`,
            category: "COMPANY_STAND",
            points: scannerUser.companyProfile.points,
          },
        ],
      });
    }

    // Caso STAFF ou ADMIN: carrega atividades ativas
    const activities = await prisma.activity.findMany({
      where: { isActive: true },
      orderBy: { startDate: "asc" },
      select: {
        id: true,
        title: true,
        type: true,
        points: true,
      },
    });

    const activityTargets = activities.map((act) => ({
      id: act.id,
      kind: "ACTIVITY" as const,
      title: act.title,
      category: act.type,
      points: act.points,
    }));

    // Se for ADMIN, inclui também todas as bancas de empresas ativas
    let companyTargets: {
      id: string;
      kind: "COMPANY";
      title: string;
      category: string;
      points: number;
    }[] = [];

    if (scannerUser.role === "ADMIN") {
      const companies = await prisma.company.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { id: true, name: true, points: true },
      });

      companyTargets = companies.map((comp) => ({
        id: comp.id,
        kind: "COMPANY" as const,
        title: `Banca ${comp.name}`,
        category: "COMPANY_STAND",
        points: comp.points,
      }));
    }

    return NextResponse.json({
      role: scannerUser.role,
      targets: [...activityTargets, ...companyTargets],
    });
  } catch (error) {
    console.error("Error fetching scan targets:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 2. POST: Atribui pontos/badge de Atividade ou de Banca de Empresa
export async function POST(request: Request) {
  try {
    const scannerUser = await getAuthorizedScannerUser();
    if (!scannerUser) {
      return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    const body = await request.json();
    const { qrToken, targetId, targetKind } = body as {
      qrToken?: string;
      targetId?: string;
      targetKind?: "ACTIVITY" | "COMPANY";
    };

    if (!qrToken || !targetId || !targetKind) {
      return NextResponse.json(
        { error: "Dados de leitura incompletos." },
        { status: 400 }
      );
    }

    // Validação rigorosa de permissões por role
    if (scannerUser.role === "STAFF" && targetKind !== "ACTIVITY") {
      return NextResponse.json(
        { error: "Staff só pode atribuir pontos de atividades." },
        { status: 403 }
      );
    }

    if (scannerUser.role === "COMPANY") {
      if (
        targetKind !== "COMPANY" ||
        scannerUser.companyProfile?.id !== targetId
      ) {
        return NextResponse.json(
          { error: "Empresa só pode atribuir pontos da sua própria banca." },
          { status: 403 }
        );
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const participant = await tx.user.findUnique({
        where: { qrToken: qrToken.trim() },
        select: { id: true, name: true, points: true },
      });

      if (!participant) {
        throw new Error("PARTICIPANT_NOT_FOUND");
      }

      if (targetKind === "ACTIVITY") {
        const activity = await tx.activity.findUnique({
          where: { id: targetId },
          select: { id: true, title: true, points: true, isActive: true },
        });

        if (!activity || !activity.isActive) {
          throw new Error("TARGET_INACTIVE");
        }

        await tx.userActivity.create({
          data: {
            userId: participant.id,
            activityId: activity.id,
            scannedById: scannerUser.id,
            pointsEarned: activity.points,
          },
        });

        const updatedUser = await tx.user.update({
          where: { id: participant.id },
          data: { points: { increment: activity.points } },
          select: { id: true, name: true, points: true },
        });

        return {
          participant: updatedUser,
          targetTitle: activity.title,
          pointsAwarded: activity.points,
        };
      } else {
        const company = await tx.company.findUnique({
          where: { id: targetId },
          select: { id: true, name: true, points: true, isActive: true },
        });

        if (!company || !company.isActive) {
          throw new Error("TARGET_INACTIVE");
        }

        await tx.companyVisit.create({
          data: {
            userId: participant.id,
            companyId: company.id,
            pointsEarned: company.points,
          },
        });

        const updatedUser = await tx.user.update({
          where: { id: participant.id },
          data: { points: { increment: company.points } },
          select: { id: true, name: true, points: true },
        });

        return {
          participant: updatedUser,
          targetTitle: `Banca ${company.name}`,
          pointsAwarded: company.points,
        };
      }
    });

    return NextResponse.json({
      success: true,
      message: `+${result.pointsAwarded} pts atribuídos a ${result.participant.name}!`,
      data: result,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Este participante já recebeu os pontos/badge deste registo." },
        { status: 409 }
      );
    }

    if (error instanceof Error) {
      if (error.message === "TARGET_INACTIVE") {
        return NextResponse.json(
          { error: "Atividade ou banca inativa/inexistente." },
          { status: 404 }
        );
      }
      if (error.message === "PARTICIPANT_NOT_FOUND") {
        return NextResponse.json(
          { error: "QR Code inválido ou participante não encontrado." },
          { status: 404 }
        );
      }
    }

    console.error("Error processing scan:", error);
    return NextResponse.json({ error: "Erro interno ao processar leitura." }, { status: 500 });
  }
}