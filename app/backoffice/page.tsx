"use client";

import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function BackOfficePage() {
  const [result, setResult] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#161E2E] px-6 py-12 text-white">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Scanner QR Code
        </h1>

        <p className="mt-2 text-[#92B4D4]">
          40 Anos da Licenciatura em Ciências da Computação
        </p>
      </div>

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-3">
        <BarcodeScannerComponent
          width="100%"
          height={350}
          onUpdate={(err, result) => {
            if (result) {
              setResult(result.getText());
            }
          }}
        />
      </div>

      {result && (
        <div className="mt-8 w-full max-w-md rounded-xl border border-[#3B9EFF]/30 bg-[#202A3D] p-6">
          <h2 className="text-lg font-semibold">
            Participante identificado!
          </h2>

          <p className="mt-3 text-sm text-[#92B4D4]">
            Identificador:
          </p>

          <p className="mt-1 break-all text-xl font-bold text-[#3B9EFF]">
            {result}
          </p>

          <button
            onClick={() => setResult("")}
            className="mt-6 w-full rounded-lg bg-[#3B9EFF] px-4 py-3 font-semibold transition hover:bg-blue-500"
          >
            Ler outro QR Code
          </button>
        </div>
      )}
    </main>
  );
}