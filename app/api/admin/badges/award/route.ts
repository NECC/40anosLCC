import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/apiResponse";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return errorResponse("Authentication required", 401);
  }

  if (session.user.role !== "ADMIN") {
    return errorResponse(
      "You do not have permission to perform this action",
      403,
    );
  }

  const { userId, badgeId } = await req.json();

  if (!userId || !badgeId) {
    return errorResponse("User ID and badge ID are required", 400);
  }

  const [user, badge] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    }),
    prisma.badge.findUnique({
      where: { id: badgeId },
      select: { id: true },
    }),
  ]);

  if (!user || !badge) {
    return errorResponse("User or badge not found", 404);
  }

  await prisma.userBadge.upsert({ // create a new record if it doesn't exist, or do nothing if it does
    where: {
      userId_badgeId: {
        userId,
        badgeId,
      },
    },
    update: {},
    create: {
      userId,
      badgeId,
    },
  });

  return successResponse({
    message: "Badge added to user",
  });
}
