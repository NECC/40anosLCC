import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type SignUpBody = {
  email?: string;
};

export async function POST(request: Request) {
  const body = await request.json() as SignUpBody;
  if (!body.email) 
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const email = body.email.trim().toLowerCase();

  if (!email || email.length > 254 || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "sign-in",
      },
      headers: request.headers,
    });

    return NextResponse.json({
      message: "Verification code sent",
      status: 200,
    });
  } catch (error) {
    console.error("Unable to send signup OTP", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
