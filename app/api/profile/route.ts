import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma"; // Ajusta se o teu export for { prisma }

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        qrToken: true,
        points: true,
        earnedBadges: {
          include: {
            activity: {
              select: {
                id: true,
                title: true,
                type: true,
                points: true,
                badgeName: true,
                badgeIcon: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calcula a posição global (quantos utilizadores têm estritamente mais pontos + 1)
    const usersAhead = await prisma.user.count({
      where: {
        points: { gt: user.points },
      },
    });
    const rank = usersAhead + 1;

    // Totais disponíveis no evento para cada tipo de atividade
    const [totalTalks, totalWorkshops, totalNightActivities] = await Promise.all([
      prisma.activity.count({ where: { type: "TALK" } }),
      prisma.activity.count({ where: { type: "WORKSHOP" } }),
      prisma.activity.count({ where: { type: "NIGHT_ACTIVITY" } }),
    ]);

    const completedTalks = user.earnedBadges.filter(
      (b) => b.activity.type === "TALK"
    ).length;

    const completedWorkshops = user.earnedBadges.filter(
      (b) => b.activity.type === "WORKSHOP"
    ).length;

    const completedNightActivities = user.earnedBadges.filter(
      (b) => b.activity.type === "NIGHT_ACTIVITY"
    ).length;

    return NextResponse.json({
      qrToken: user.qrToken,
      points: user.points,
      role: user.role,
      rank,
      stats: {
        sessions: `${String(completedTalks).padStart(2, "0")}/${String(totalTalks).padStart(2, "0")}`,
        workshops: `${String(completedWorkshops).padStart(2, "0")}/${String(totalWorkshops).padStart(2, "0")}`,
        nightActivities: `${String(completedNightActivities).padStart(2, "0")}/${String(totalNightActivities).padStart(2, "0")}`,
        badgesCount: user.earnedBadges.length,
      },
      badges: user.earnedBadges,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}