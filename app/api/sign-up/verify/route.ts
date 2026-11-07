import { NextResponse } from "next/server";
import { parseSetCookieHeader } from "better-auth/cookies";
import { auth } from "@/lib/auth/auth";
import { validateSignUpVerification } from "@/lib/auth/auth-validation";

// TODO: Add rate limiting to prevent brute force attacks
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  if (!validateSignUpVerification(body)) {
    return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
  }

  const { email, isStudent, name, otp, password, studyYear } = body;

  const signInResponse = await auth.api.signInEmailOTP({
    body: {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      otp: otp.trim(),
      isStudent,
      studyYear: isStudent ? studyYear : undefined,
    },
    headers: request.headers,
    asResponse: true,
  });

  if (!signInResponse.ok) {
    return signInResponse;
  }

  const authenticatedHeaders = new Headers(request.headers);
  const cookies = parseSetCookieHeader(signInResponse.headers.get("set-cookie") ?? "");
  authenticatedHeaders.set(
    "cookie",
    [...cookies].map(([name, attributes]) => `${name}=${attributes.value}`).join("; "),
  );

  await auth.api.setPassword({
    body: { newPassword: password },
    headers: authenticatedHeaders,
  });

  return signInResponse;
}
