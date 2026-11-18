"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRightFromBracket,
  FaCalendarCheck,
  FaChevronRight,
  FaIdBadge,
  FaLaptopCode,
  FaRankingStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa6";
import { navLinks } from "@/components/layout-content";
import { authClient } from "@/lib/auth/auth-client";


export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [qrCode, setQrCode] = useState("");
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    QRCode.toDataURL(userId, {
      width: 280,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: "#00B4F0", // Azul ciano alinhado com o branding 40 Anos LCC
        light: "#06151E", // Fundo escuro do cartão
      },
    })
      .then((url) => {
        if (!cancelled) setQrCode(url);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push(navLinks.Home);
  };

  // Valores placeholder até ligarmos à base de dados
  const stats = {
    points: 0,
    rank: "--",
    sessions: "00/16",
    workshops: "00",
    connections: "00",
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#051118] text-white">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:px-10">
        {/* Barra Superior de Ações */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={navLinks.Home}
            className="inline-flex items-center gap-2.5 text-sm font-medium text-[#8BA3B5] transition hover:text-white"
            aria-label="Back to home page"
          >
            <FaArrowLeft className="text-xs text-[#00B4F0]" />
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081A24]/80 px-4 py-2 text-xs font-medium text-[#8BA3B5] transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            <FaArrowRightFromBracket className="text-xs" />
            <span>Sign Out</span>
          </button>
        </div>

        {isPending ? (
          <div className="flex h-[60vh] items-center justify-center">
            <p className="font-mono text-sm tracking-wider text-[#00B4F0]">
              LOADING PROFILE...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* COLUNA ESQUERDA: Identidade, Pontuação, Estatísticas e Leaderboard */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              {/* Cabeçalho do Perfil */}
              <section className="rounded-2xl border border-white/[0.08] bg-[#081A24]/90 p-7 backdrop-blur-sm">
                <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {session?.user.name || "Participant"}
                    </h1>
                  </div>
                </div>

                {/* Pontuação e Posição */}
                <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6">
                  <div className="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-[#051118]/70 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00B4F0]/10 text-[#00B4F0]">
                      <FaTrophy className="text-lg" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-semibold tracking-wider text-[#8BA3B5] uppercase">
                        Total Points
                      </p>
                      <p className="mt-0.5 text-2xl font-bold text-white">
                        {stats.points}{" "}
                        <span className="text-sm font-normal text-[#00B4F0]">
                          pts
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-[#051118]/70 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00B4F0]/10 text-[#00B4F0]">
                      <FaRankingStar className="text-lg" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-semibold tracking-wider text-[#8BA3B5] uppercase">
                        Global Rank
                      </p>
                      <p className="mt-0.5 text-2xl font-bold text-white">
                        #{stats.rank}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Grelha de Estatísticas (3 colunas) */}
              <section className="grid grid-cols-3 gap-4">
                <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#081A24]/90 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#8BA3B5] uppercase">
                      Sessions
                    </span>
                    <FaCalendarCheck className="text-sm text-[#00B4F0]" />
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-white">
                      {stats.sessions}
                    </span>
                    <p className="mt-1 text-xs text-[#8BA3B5]">Attended</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#081A24]/90 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#8BA3B5] uppercase">
                      Workshops
                    </span>
                    <FaLaptopCode className="text-sm text-[#00B4F0]" />
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-white">
                      {stats.workshops}
                    </span>
                    <p className="mt-1 text-xs text-[#8BA3B5]">Completed</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#081A24]/90 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-[#8BA3B5] uppercase">
                      Network
                    </span>
                    <FaUsers className="text-sm text-[#00B4F0]" />
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-white">
                      {stats.connections}
                    </span>
                    <p className="mt-1 text-xs text-[#8BA3B5]">Connections</p>
                  </div>
                </div>
              </section>
            </div>

            {/* COLUNA DIREITA: Credencial Digital (QR Code) */}
            <div className="lg:col-span-5">
              <section className="rounded-2xl border border-white/[0.08] bg-[#081A24]/90 p-7 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#00B4F0]">
                    <FaIdBadge className="text-lg" />
                    <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-white uppercase">
                      Digital Credential
                    </h2>
                  </div>

                  <span className="rounded-md border border-[#00B4F0]/30 bg-[#00B4F0]/10 px-2.5 py-1 font-mono text-xs font-medium text-[#00B4F0]">
                    ID: {userId ? userId.slice(0, 8).toUpperCase() : "---"}
                  </span>
                </div>

                <div className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-[#051118]/90 p-8">
                  {qrCode ? (
                    <div className="relative p-4">
                      {/* Cantoneiras decorativas */}
                      <span className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-[#00B4F0]" />
                      <span className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-[#00B4F0]" />
                      <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[#00B4F0]" />
                      <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[#00B4F0]" />

                      <div className="overflow-hidden rounded-lg bg-[#06151E] p-3 shadow-[0_0_30px_rgba(0,180,240,0.08)]">
                        <Image
                          src={qrCode}
                          alt="Participant QR code"
                          width={250}
                          height={250}
                          unoptimized
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[282px] w-[282px] items-center justify-center">
                      <span className="font-mono text-xs text-[#8BA3B5]">
                        Generating QR...
                      </span>
                    </div>
                  )}

                  <p className="mt-6 text-center text-sm leading-relaxed text-[#8BA3B5]">
                    Present this QR code to staff at sessions, talks and
                    workshops to collect points.
                  </p>

                  <div className="mt-4 border-t border-white/[0.06] pt-4 text-center">
                    <p className="font-mono text-[11px] tracking-wider text-[#00B4F0]/80 uppercase">
                      Campus de Gualtar • Braga
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}