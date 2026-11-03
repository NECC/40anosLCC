"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function ProfilePage() {
  const [qrCode, setQrCode] = useState("");
  const participantId = "participant-123";

  useEffect(() => {
    QRCode.toDataURL(participantId, {
      width: 240,
      margin: 2,
      errorCorrectionLevel: "H",
    }).then(setQrCode);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#161E2E] px-6 text-white">
      <h1 className="text-3xl font-bold">40 Anos LCC</h1>

      <p className="text-[#92B4D4]">
        O teu cartão de participante
      </p>

      {qrCode && (
        <div className="rounded-2xl bg-white p-6">
          <img
            src={qrCode}
            alt="QR Code do participante"
            width={240}
            height={240}
          />
        </div>
      )}

      <p className="text-sm text-[#92B4D4]">
        ID: {participantId}
      </p>
    </main>
  );
}