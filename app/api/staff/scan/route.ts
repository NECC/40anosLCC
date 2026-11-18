import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client"; // Ajusta se o teu import do client Prisma for diferente
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";

// Helper para validar sessão e permissões de STAFF/ADMIN
async function getAuthorizedStaff() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return null;
  }

  const staffUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, role: true },
  });

  if (!staffUser || (staffUser.role !== "STAFF" && staffUser.role !== "ADMIN")) {
    return null;
  }

  return staffUser;
}

// 1. GET: Lista as atividades ativas para o seletor do scanner
export async function GET() {
  try {
    const staff = await getAuthorizedStaff();
    if (!staff) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const activities = await prisma.activity.findMany({
      where: { isActive: true },
      orderBy: { startDate: "asc" },
      select: {
        id: true,
        title: true,
        type: true,
        points: true,
        badgeName: true,
        startDate: true,
        endDate: true,
      },
    });

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Error fetching staff activities:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 2. POST: Lê o qrToken do participante, atribui a badge única e soma os pontos
export async function POST(request: Request) {
  try {
    const staff = await getAuthorizedStaff();
    if (!staff) {
      return NextResponse.json(
        { error: "Acesso negado. Apenas Staff ou Admin." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { qrToken, activityId } = body as {
      qrToken?: string;
      activityId?: string;
    };

    if (!qrToken || !activityId) {
      return NextResponse.json(
        { error: "QR Code ou atividade em falta." },
        { status: 400 }
      );
    }

    // Executa tudo numa transação atómica
    const result = await prisma.$transaction(async (tx) => {
      // 1. Verifica se a atividade existe e está ativa
      const activity = await tx.activity.findUnique({
        where: { id: activityId },
        select: {
          id: true,
          title: true,
          points: true,
          badgeName: true,
          isActive: true,
        },
      });

      if (!activity || !activity.isActive) {
        throw new Error("ACTIVITY_INACTIVE");
      }

      // 2. Procura o participante pelo qrToken
      const participant = await tx.user.findUnique({
        where: { qrToken: qrToken.trim() },
        select: { id: true, name: true, email: true, points: true },
      });

      if (!participant) {
        throw new Error("PARTICIPANT_NOT_FOUND");
      }

      // 3. Tenta criar a badge (UserActivity).
      // Se já existir, o PostgreSQL lança erro P2002 por causa de @@unique([userId, activityId])
      await tx.userActivity.create({
        data: {
          userId: participant.id,
          activityId: activity.id,
          scannedById: staff.id,
          pointsEarned: activity.points,
        },
      });

      // 4. Soma os pontos ao participante
      const updatedUser = await tx.user.update({
        where: { id: participant.id },
        data: {
          points: { increment: activity.points },
        },
        select: {
          id: true,
          name: true,
          points: true,
        },
      });

      return {
        participant: updatedUser,
        activityTitle: activity.title,
        badgeName: activity.badgeName || activity.title,
        pointsAwarded: activity.points,
      };
    });

    return NextResponse.json({
      success: true,
      message: `+${result.pointsAwarded} pts atribuídos a ${result.participant.name}!`,
      data: result,
    });
  } catch (error) {
    // Tratamento explícito de erros de negócio e concorrência
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 = Unique constraint failed (@@unique([userId, activityId]))
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Este participante já recebeu a badge e pontos desta atividade." },
          { status: 409 }
        );
      }
    }

    if (error instanceof Error) {
      if (error.message === "ACTIVITY_INACTIVE") {
        return NextResponse.json(
          { error: "Esta atividade não existe ou está inativa." },
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
    return NextResponse.json(
      { error: "Erro interno ao processar leitura." },
      { status: 500 }
    );
  }
}