"use client";

import { useState } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function OtpInput({ value, onChange }: OtpInputProps) {
  const [focused, setFocused] = useState(true);
  const active = Math.min(value.length, 5);

  return (
    <div className="relative">
      <input
        id="auth-otp"
        name="otp"
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value.replace(/\D/g, "").slice(0, 6))
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]{6}"
        maxLength={6}
        required
        autoFocus
        aria-label="Verification code"
        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
      />

      <div className="flex gap-2 sm:gap-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`flex h-14 min-w-0 flex-1 items-center justify-center rounded-xl border bg-[#071923] font-mono text-2xl text-white transition-colors ${
              focused && index === active
                ? "border-[#00a8e8] ring-2 ring-[#00a8e8]/20"
                : value[index]
                  ? "border-[#65c8ed]/60"
                  : "border-[#294556]"
            }`}
          >
            {value[index] ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
