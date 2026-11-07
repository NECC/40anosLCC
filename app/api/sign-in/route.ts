import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { validateSignInDetails } from "@/lib/auth/auth-validation";

// TODO: Add rate limiting to prevent brute force attacks
// TODO: Add IP-based rate limiting

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  if (!validateSignInDetails(body)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  return auth.api.signInEmail({
    body: {
      email: body.email.trim().toLowerCase(),
      password: body.password,
      rememberMe: true,
    },
    headers: request.headers,
    asResponse: true,
  });
}
