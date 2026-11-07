"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/components/layout-content";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import FormInput from "@/components/inputs/formInput";
import { useSession } from "@/lib/auth/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const { refetch: refetchSession } = useSession();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await axios.post("/api/sign-in", {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      await refetchSession();
      router.push(navLinks.Profile);
      router.refresh();
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06151D] text-white selection:bg-[#00a8e8] selection:text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 mask-[linear-gradient(to_bottom,black_20%,transparent_85%)]" />
      <div className="pointer-events-none absolute top-0 right-0 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#00a8e8]/20 blur-[100px] md:size-112" />
      <div className="pointer-events-none absolute top-1/2 left-0 size-72 -translate-x-1/2 rounded-full bg-[#00a8e8]/15 blur-[100px]" />

      <section className="relative mx-auto grid w-full max-w-400 gap-12 px-2 pt-32 pb-20 sm:px-10 md:pt-40 md:pb-28 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-16">
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
            Sign in
          </p>
          <h1 className="font-space-grotesk text-2xl font-medium sm:text-3xl">
            Welcome back
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <FormInput
              id="sign-in-email"
              name="email"
              label="Email address"
              icon={<FiMail size={18} />}
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />

            <FormInput
              id="sign-in-password"
              name="password"
              label="Password"
              icon={<FiLock size={18} />}
              type="password"
              autoComplete="current-password"
              required
              placeholder="Your password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#0090c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
              <FaArrowCircleRight aria-hidden="true" />
            </button>
            {error && (
              <p className="font-manrope text-sm text-red-400">{error}</p>
            )}
            <p className="font-manrope text-xs text-gray-400">
              New to the celebration?{" "}
              <Link href={navLinks.SignUp} className="text-[#65c8ed] underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ error?: string; message?: string }>(error)) {
    return (
      error.response?.data.message ??
      error.response?.data.error ??
      "Invalid email or password"
    );
  }

  return "Unable to sign in";
}
