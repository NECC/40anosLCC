import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/apiResponse";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        type: true,
        speakers: {
          select: {
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

    return successResponse(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);

    return errorResponse("An unexpected error occurred", 500);
  }
}
