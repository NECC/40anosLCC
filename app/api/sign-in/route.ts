import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { validateSignInDetails } from "@/lib/auth/auth-validation";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  if (!validateSignInDetails(body)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { error: "Não existe nenhuma conta com este email." },
      { status: 404 },
    );
  }

  try {
    await auth.api.sendVerificationOTP({
      body: { email, type: "sign-in" },
      headers: request.headers,
    });
    return NextResponse.json({ message: "Código enviado" });
  } catch (error) {
    console.error("Unable to send sign-in OTP", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
