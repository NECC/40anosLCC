"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

type Badge = { id: string; name: string };

const RESULT_MS = 1800;

export default function BackOfficePage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badgeId, setBadgeId] = useState("");
  const [qrCodeResult, setQrCodeResult] = useState<boolean | undefined>();

  const busy = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    axios
      .get("/api/admin/badges")
      .then(({ data }) => setBadges(data.data))
      .catch((err) => console.error("Failed to load badges:", err));

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function handleScan(userId: string) {
    if (!badgeId || busy.current) return;

    busy.current = true;

    try {
      await axios.post("/api/admin/badges/award", {
        userId,
        badgeId,
      });

      setQrCodeResult(true);
      navigator.vibrate?.(80);
    } catch {
      setQrCodeResult(false);
      navigator.vibrate?.([120, 60, 120]);
    }

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setQrCodeResult(undefined);
      busy.current = false;
    }, RESULT_MS);
  }

  return (
    <main className="relative flex h-dvh flex-col bg-[#0F1623] text-white">
      <header className="z-10 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
        <select
          value={badgeId}
          onChange={(e) => setBadgeId(e.target.value)}
          aria-label="Badge a atribuir"
          className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-[#1B2538] px-5 text-base font-semibold text-white outline-none focus:border-[#3B9EFF]"
        >
          <option value="">Escolhe a badge…</option>

          {badges.map((badge) => (
            <option key={badge.id} value={badge.id}>
              {badge.name}
            </option>
          ))}
        </select>
      </header>

      <section className="relative mx-4 mb-[max(1rem,env(safe-area-inset-bottom))] flex-1 overflow-hidden rounded-3xl bg-black">
        {badgeId ? (
          <>
            <BarcodeScannerComponent
              width="100%"
              height="100%"
              onUpdate={(_, result) => {
                if (result) handleScan(result.getText());
              }}
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="aspect-square w-3/4 rounded-3xl border-4 border-white/80 shadow-[0_0_0_100vmax_rgba(0,0,0,0.45)]" />
            </div>
          </>
        ) : (
          <p className="flex h-full items-center justify-center px-10 text-center text-lg text-[#92B4D4]">
            Escolhe uma badge para ativar a câmara.
          </p>
        )}
      </section>

      {qrCodeResult !== undefined && (
        <div
          role="status"
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-8 text-center ${
            qrCodeResult ? "bg-green-600" : "bg-red-600"
          }`}
        >
       

          <p className="text-3xl font-extrabold leading-tight">
            {qrCodeResult
              ? "Badge atribuída com sucesso!"
              : "Falha ao atribuir badge."}
          </p>
        </div>
      )}
    </main>
  );
}
