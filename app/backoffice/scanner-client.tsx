"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaBuilding,
  FaCircleCheck,
  FaCircleExclamation,
  FaQrcode,
} from "react-icons/fa6";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

interface ScanTarget {
  id: string;
  kind: "ACTIVITY" | "COMPANY";
  title: string;
  category: string;
  points: number;
}

interface ScanFeedback {
  status: "success" | "error";
  message: string;
  participantName?: string;
  totalPoints?: number;
  pointsAwarded?: number;
  targetTitle?: string;
}

export function ScannerClient() {
  const [role, setRole] = useState<"ADMIN" | "STAFF" | "COMPANY" | null>(null);
  const [targets, setTargets] = useState<ScanTarget[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<ScanFeedback | null>(null);
  const isLockedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/staff/scan")
      .then(async (res) => {
        if (!res.ok) throw new Error("Sem permissão.");
        return res.json();
      })
      .then(
        (data: {
          role: "ADMIN" | "STAFF" | "COMPANY";
          targets: ScanTarget[];
          warning?: string;
        }) => {
          if (!cancelled) {
            setRole(data.role);
            setTargets(data.targets || []);
            setWarning(data.warning || null);
            if (data.targets?.length > 0) {
              setSelectedKey(`${data.targets[0].kind}:${data.targets[0].id}`);
            }
            setIsLoading(false);
          }
        }
      )
      .catch((err) => {
        console.error(err);
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTarget = targets.find(
    (t) => `${t.kind}:${t.id}` === selectedKey
  );

  const handleScan = async (scannedToken: string) => {
    if (isLockedRef.current || !selectedTarget) return;
    isLockedRef.current = true;
    setIsProcessing(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/staff/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrToken: scannedToken,
          targetId: selectedTarget.id,
          targetKind: selectedTarget.kind,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setFeedback({
          status: "error",
          message: payload.error || "Não foi possível validar o QR Code.",
        });
      } else {
        setFeedback({
          status: "success",
          message: payload.message,
          participantName: payload.data.participant.name,
          totalPoints: payload.data.participant.points,
          pointsAwarded: payload.data.pointsAwarded,
          targetTitle: payload.data.targetTitle,
        });
      }
    } catch {
      setFeedback({
        status: "error",
        message: "Erro de ligação ao servidor.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetScanner = () => {
    setFeedback(null);
    isLockedRef.current = false;
  };

  return (
    <main className="min-h-screen bg-[#051118] px-5 py-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-[#8BA3B5] transition hover:text-white"
          >
            <FaArrowLeft className="text-xs text-[#00B4F0]" />
            <span>Back to Profile</span>
          </Link>

          <span className="rounded-md border border-[#00B4F0]/30 bg-[#00B4F0]/10 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-[#00B4F0] uppercase">
            {role ? `${role} Scanner` : "Scanner"}
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Scanner QR Code
          </h1>
          <p className="mt-1 text-xs text-[#8BA3B5]">
            40 Anos da Licenciatura em Ciências da Computação
          </p>
        </div>

        <section className="rounded-2xl border border-white/[0.08] bg-[#081A24] p-5">
          {isLoading ? (
            <p className="font-mono text-xs text-[#8BA3B5]">A carregar...</p>
          ) : warning ? (
            <p className="text-xs text-amber-400">{warning}</p>
          ) : targets.length === 0 ? (
            <p className="text-xs text-amber-400">
              Nenhuma atividade ou banca ativa encontrada.
            </p>
          ) : role === "COMPANY" && selectedTarget ? (
            <div>
              <span className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider text-[#00B4F0] uppercase">
                <FaBuilding />
                <span>Banca da Empresa</span>
              </span>
              <div className="flex items-center justify-between rounded-xl border border-[#00B4F0]/30 bg-[#051118] px-4 py-3">
                <span className="text-sm font-bold text-white">
                  {selectedTarget.title}
                </span>
                <span className="font-mono text-xs font-bold text-[#00B4F0]">
                  +{selectedTarget.points} pts
                </span>
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="target-select"
                className="mb-2 block font-mono text-[11px] font-semibold tracking-wider text-[#00B4F0] uppercase"
              >
                1. Selecionar {role === "ADMIN" ? "Atividade ou Banca" : "Atividade"}
              </label>
              <select
                id="target-select"
                value={selectedKey}
                onChange={(e) => {
                  setSelectedKey(e.target.value);
                  handleResetScanner();
                }}
                className="w-full rounded-xl border border-white/10 bg-[#051118] px-3.5 py-3 text-sm text-white focus:border-[#00B4F0] focus:outline-none"
              >
                {targets.map((target) => (
                  <option
                    key={`${target.kind}:${target.id}`}
                    value={`${target.kind}:${target.id}`}
                  >
                    [{target.category.replace("_", " ")}] {target.title} (+
                    {target.points} pts)
                  </option>
                ))}
              </select>
            </>
          )}
        </section>

        {!feedback && selectedTarget && (
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#081A24] p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider text-[#8BA3B5] uppercase">
              <FaQrcode className="text-[#00B4F0]" />
              <span>
                {isProcessing
                  ? "A validar participante..."
                  : "Apontar para o QR Code do participante"}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#00B4F0]/30 bg-black">
              <BarcodeScannerComponent
                width="100%"
                height={340}
                facingMode="environment"
                onUpdate={(_err, result) => {
                  if (result && !isLockedRef.current) {
                    handleScan(result.getText());
                  }
                }}
              />
            </div>
          </section>
        )}

        {feedback && (
          <section
            className={`rounded-2xl border p-6 ${
              feedback.status === "success"
                ? "border-emerald-500/40 bg-emerald-950/30"
                : "border-red-500/40 bg-red-950/30"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.status === "success" ? (
                <FaCircleCheck className="shrink-0 text-2xl text-emerald-400" />
              ) : (
                <FaCircleExclamation className="shrink-0 text-2xl text-red-400" />
              )}
              <div>
                <h2 className="text-lg font-bold text-white">
                  {feedback.status === "success"
                    ? "Pontos Atribuídos!"
                    : "Leitura Recusada"}
                </h2>
                <p className="text-xs text-slate-300">{feedback.message}</p>
              </div>
            </div>

            {feedback.status === "success" && (
              <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-[#051118]/80 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8BA3B5]">Participante:</span>
                  <span className="font-semibold text-white">
                    {feedback.participantName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8BA3B5]">Registo:</span>
                  <span className="font-medium text-slate-200">
                    {feedback.targetTitle}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-[#8BA3B5]">Novo Saldo:</span>
                  <span className="font-mono font-bold text-[#00B4F0]">
                    {feedback.totalPoints} pts (+{feedback.pointsAwarded})
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleResetScanner}
              className="mt-6 w-full rounded-xl bg-[#00B4F0] px-4 py-3.5 text-sm font-bold text-[#051118] transition hover:bg-[#33C5F5]"
            >
              Ler próximo QR Code
            </button>
          </section>
        )}
      </div>
    </main>
  );
}