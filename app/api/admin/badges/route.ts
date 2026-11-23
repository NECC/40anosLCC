import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/apiResponse";

export async function GET() {
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

  const badges = await prisma.badge.findMany({
    select: { id: true, name: true, },
    orderBy: { name: "asc" },
  });

  return successResponse(badges);
}
