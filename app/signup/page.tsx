"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiHash, FiMail, FiUser } from "react-icons/fi";
import FormInput from "@/components/inputs/formInput";
import { navLinks } from "@/components/layout-content";
import { authClient } from "@/lib/auth/auth-client";

export default function JoinPage() {
  const router = useRouter();
  const [details, setDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const signUpDetails = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
    };

    const res = await fetch("/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpDetails),
    });
    const data = await res.json().catch(() => ({}));

    setIsSubmitting(false);
    if (!res.ok) return setError(data.error ?? "Unable to send code");
    setDetails(signUpDetails);
  }

  async function handleVerification(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!details) return;
    setError("");
    setIsSubmitting(true);

    const otp = String(new FormData(event.currentTarget).get("otp") ?? "");
    const { error } = await authClient.signIn.emailOtp({
      email: details.email,
      otp,
    });

    setIsSubmitting(false);
    if (error) return setError(error.message ?? "Invalid code");

    router.push(navLinks.Profile);
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06151D] text-white selection:bg-[#00a8e8] selection:text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 mask-[linear-gradient(to_bottom,black_20%,transparent_85%)]" />
      <div className="pointer-events-none absolute top-0 right-0 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#00a8e8]/20 blur-[100px] md:size-112" />
      <div className="pointer-events-none absolute top-1/2 left-0 size-72 -translate-x-1/2 rounded-full bg-[#00a8e8]/15 blur-[100px]" />

      <section className="relative mx-auto grid w-full max-w-400 gap-12 px-2 pt-32 pb-20 sm:px-10 md:pt-40 md:pb-28 lg:grid-cols-2 lg:items-start lg:gap-20 lg:px-16">
        <div className="flex items-center justify-center">
          <Image
            src="/logocomtexto4oLCC.svg"
            alt="40 years of LCC"
            width={640}
            height={640}
            className="h-auto w-64 sm:w-80 lg:w-full lg:max-w-lg"
            priority
          />
        </div>

        <div className="rounded-2xl border border-gray-800/80 bg-[#091d29]/90 p-6 shadow-2xl shadow-black/20 sm:p-8 md:p-10">
          <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
            {details ? "Verify email" : "Sign up"}
          </p>
          <h1 className="font-space-grotesk text-2xl font-medium sm:text-3xl">
            {details ? "Check your inbox" : "Join the celebration"}
          </h1>

          {details ? (
            <form
              key="verification-form"
              onSubmit={handleVerification}
              className="mt-8 space-y-5"
            >
              <p className="font-manrope text-sm text-gray-300">
                We sent a six-digit verification code to {details.email}.
              </p>
              <FormInput
                id="otp"
                name="otp"
                label="Verification code"
                icon={<FiHash size={18} />}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                placeholder="123456"
              />
              {error && (
                <p className="font-manrope text-sm text-red-400">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#0090c7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Verifying…" : "Verify email"}
                <FaArrowCircleRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDetails(null);
                  setError("");
                }}
                className="font-manrope text-xs text-[#65c8ed] underline-offset-4 hover:underline"
              >
                Use a different email
              </button>
            </form>
          ) : (
            <form
              key="signup-form"
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <FormInput
                id="name"
                name="name"
                label="Full name"
                icon={<FiUser size={18} />}
                type="text"
                autoComplete="name"
                required
                placeholder="Your full name"
              />

              <FormInput
                id="email"
                name="email"
                label="Email address"
                icon={<FiMail size={18} />}
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />

              <p className="font-manrope text-xs text-gray-400">
                Already have an account?{" "}
                <Link
                  href={navLinks.SignIn}
                  className="text-[#65c8ed] underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
              {error && (
                <p className="font-manrope text-sm text-red-400">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#0090c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Join the celebration"}
                <FaArrowCircleRight aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
