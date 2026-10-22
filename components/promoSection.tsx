"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";
import { blurReveal } from "@/lib/animations";

interface PromoSectionProps {
  label: string;
  title: string;
  buttonText: string;
  href: string;
}

export default function PromoSection({
  label,
  title,
  buttonText,
  href,
}: PromoSectionProps) {
  return (
    <motion.section
      {...blurReveal}
      className="relative overflow-hidden border-y border-gray-800/50 py-20 text-white md:py-28"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-80 mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-[#06151D] to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-[#06151D] to-transparent" />

      <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />

      <span className="absolute right-[10%] bottom-[20%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />

      <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-2 text-center sm:px-10 md:max-w-4xl">
        <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-[#00a8e8] uppercase sm:text-xs">
          {label}
        </p>

        <h2 className="mb-10 font-space-grotesk text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-6xl md:leading-tight">
          {title}
        </h2>

        <Link
          href={href}
          className="inline-flex items-center gap-3 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-xs font-semibold text-white transition-all hover:bg-[#0090c7] md:text-sm"
        >
          <span>{buttonText}</span>
          <FaArrowCircleRight />
        </Link>
      </div>
    </motion.section>
  );
}
