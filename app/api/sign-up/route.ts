import { randomUUID } from "node:crypto";
import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

const signUpSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid data", 400);
    }

    const name = result.data.name;
    const email = result.data.email.toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing?.emailVerified) {
      return errorResponse("An unexpected error occurred", 409);
    }

    if (existing) {
      await prisma.user.update({
        where: { email },
        data: { name },
      });
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
        },
      });
    }

    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "sign-in",
      },
      headers: request.headers,
    });

    return successResponse({
      message: "Verification code sent",
    });
  } catch (error) {
    console.error("Unable to sign up", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
