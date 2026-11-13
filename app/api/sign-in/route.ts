import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

const signInSchema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = signInSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid data", 400);
    }

    const email = result.data.email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("An unexpected error occurred", 404);
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
    console.error("Unable to send sign-in OTP", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
