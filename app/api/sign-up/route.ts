import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { validateSignUpDetails } from "@/lib/auth/auth-validation";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  // Syntactic validation (Generic error logs for security reasons)
  if (!validateSignUpDetails(body)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await auth.api.sendVerificationOTP({
      body: {
        email: body.email,
        type: "sign-in",
      },
      headers: request.headers,
    });

    return NextResponse.json({
      message: "Verification code sent",
    });
  } catch (error) {
    console.error("Unable to send signup OTP", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
