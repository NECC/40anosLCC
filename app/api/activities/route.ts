import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        speakers: {
          select: {
            id: true,
            name: true,
            bio: true,
            photo: true,
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);

    return NextResponse.json(
      { error: "Error fetching activities" },
      { status: 500 },
    );
  }
}
