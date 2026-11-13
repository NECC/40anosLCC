import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { validateSignUpDetails } from "@/lib/auth/auth-validation";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  if (!validateSignUpDetails(body)) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing?.emailVerified) {
    return NextResponse.json(
      { error: "Já existe uma conta com este email. Faz sign in." },
      { status: 409 },
    );
  }

  try {
    if (existing) {
      await prisma.user.update({ where: { email }, data: { name } });
    } else {
      await prisma.user.create({
        data: { id: randomUUID(), name, email, emailVerified: false },
      });
    }

    await auth.api.sendVerificationOTP({
      body: { email, type: "sign-in" },
      headers: request.headers,
    });

    return NextResponse.json({ message: "Código enviado" });
  } catch (error) {
    console.error("Unable to sign up", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
