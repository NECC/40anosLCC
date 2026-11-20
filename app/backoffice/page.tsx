import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { ScannerClient } from "./scanner-client";

export default async function BackOfficePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role === "USER") {
    redirect("/profile");
  }

  return <ScannerClient />;
}