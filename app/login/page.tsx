"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiMail, FiUser } from "react-icons/fi";
import { showToast } from "nextjs-toast-notify";
import FormInput from "@/components/inputs/formInput";
import { navLinks } from "@/components/layout-content";
import { authClient } from "@/lib/auth/auth-client";
import OtpInput from "@/components/inputs/otpInput";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSignUp(false);
    setEmail("");
    setOtp("");
    setLoading(false);
  }, []);

  async function sendCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await axios.post(`/api/${isSignUp ? "sign-up" : "sign-in"}`, data);
      setEmail(String(data.email));
    } catch {
      showToast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await authClient.signIn.emailOtp({ email, otp });
      if (error) return showToast.error("Invalid verification code");
      router.push(navLinks.Profile);
      router.refresh();
    } catch {
      showToast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06151D] px-4 py-20 text-white selection:bg-[#00a8e8]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 mask-[linear-gradient(to_bottom,black_20%,transparent_85%)]" />

      <div className="relative w-full max-w-md rounded-2xl border border-gray-800/80 bg-[#091d29]/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <p className="mb-3 font-mono text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
          {email ? "Verify email" : isSignUp ? "Sign up" : "Sign in"}
        </p>
        <h1 className="font-space-grotesk text-2xl font-medium sm:text-3xl">
          {email
            ? "Check your inbox"
            : isSignUp
              ? "Join the celebration"
              : "Welcome back"}
        </h1>

        {email ? (
          <form onSubmit={verifyCode} className="mt-8 space-y-5">
            <p className="font-manrope text-sm text-gray-300">
              We sent a six-digit code to {email}.
            </p>
            <OtpInput value={otp} onChange={setOtp} />
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="flex w-full items-center justify-between rounded-lg bg-[#00a8e8] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0090c7] disabled:opacity-60"
            >
              {loading ? "Verifying…" : isSignUp ? "Verify email" : "Sign in"}
              <FaArrowCircleRight aria-hidden="true" />
            </button>
          </form>
        ) : (
          <form
            key={String(isSignUp)}
            onSubmit={sendCode}
            className="mt-8 space-y-5"
          >
            {isSignUp && (
              <FormInput
                id="auth-name"
                name="name"
                label="Full name"
                icon={<FiUser size={18} />}
                autoComplete="name"
                required
                placeholder="Your full name"
              />
            )}
            <FormInput
              id="auth-email"
              name="email"
              label="Email address"
              icon={<FiMail size={18} />}
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-between rounded-lg bg-[#00a8e8] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0090c7] disabled:opacity-60"
            >
              {loading
                ? "Sending…"
                : isSignUp
                  ? "Join the celebration"
                  : "Send code"}
              <FaArrowCircleRight aria-hidden="true" />
            </button>
            <p className="font-manrope text-xs text-gray-400">
              {isSignUp
                ? "Already have an account?"
                : "New to the celebration?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#65c8ed] hover:underline"
              >
                {isSignUp ? "Sign in" : "Create an account"}
              </button>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
