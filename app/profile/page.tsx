"use client";

import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { navLinks } from "@/components/layout-content";
import { useSession } from "@/lib/auth/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [qrCode, setQrCode] = useState("");
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    QRCode.toDataURL(userId, {
      width: 240,
      margin: 2,
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        if (!cancelled) setQrCode(url);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-[#161E2E] px-6 text-white">
      <Link
        href={navLinks.Home}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#92B4D4] transition hover:text-white"
        aria-label="Back to home page"
      >
        <FaArrowLeft className="text-lg" aria-hidden="true" />
        <span className="text-sm">Back</span>
      </Link>

      {isPending ? (
        <p className="text-[#92B4D4]">Loading…</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Welcome, {session?.user.name}</h1>
          <p className="text-[#92B4D4]">Your participant QR code</p>

          {qrCode && (
            <div className="rounded-2xl bg-white p-6">
              <Image
                src={qrCode}
                alt="Participant QR code"
                width={240}
                height={240}
                unoptimized
              />
            </div>
          )}

          <p className="text-sm text-[#92B4D4]">ID: {userId}</p>
        </>
      )}
    </main>
  );
}
