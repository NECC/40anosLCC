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

  const resetToForm = (targetSignUp: boolean) => {
    setEmail("");
    setOtp("");
    setIsSignUp(targetSignUp);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06151D] px-4 py-20 text-white selection:bg-[#00a8e8]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 mask-[linear-gradient(to_bottom,black_20%,transparent_85%)]" />

      {/* =========================================================
          UNIFIED SPLIT CARD WITH SLIDING OVERLAY (MOBILE + DESKTOP)
         ========================================================= */}
      <div className="relative grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 w-full max-w-md md:max-w-4xl min-h-[680px] md:min-h-[520px] overflow-hidden rounded-2xl border border-gray-800/80 bg-[#091d29]/90 shadow-2xl shadow-black/40">
        {/* TOP / LEFT HALF: SIGN IN */}
        <div
          className={`flex flex-col justify-center p-6 sm:p-8 lg:p-12 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "opacity-0 pointer-events-none -translate-y-6 md:translate-y-0 md:-translate-x-8"
              : "opacity-100 translate-y-0 md:translate-x-0"
          }`}
        >
          <p className="mb-2 md:mb-3 font-mono text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
            {email && !isSignUp ? "Verify email" : "Sign in"}
          </p>
          <h1 className="font-space-grotesk text-2xl font-medium sm:text-3xl">
            {email && !isSignUp ? "Check your inbox" : "Welcome back"}
          </h1>

          {email && !isSignUp ? (
            <form onSubmit={verifyCode} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
              <p className="font-manrope text-sm text-gray-300">
                We sent a six-digit code to {email}.
              </p>
              <OtpInput value={otp} onChange={setOtp} />
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="flex w-full items-center justify-between rounded-lg bg-[#00a8e8] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0090c7] disabled:opacity-60 transition cursor-pointer"
              >
                {loading ? "Verifying…" : "Sign in"}
                <FaArrowCircleRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setOtp("");
                }}
                className="font-manrope text-xs text-gray-400 hover:text-[#65c8ed] hover:underline cursor-pointer"
              >
                Use a different email
              </button>
            </form>
          ) : (
            <form onSubmit={sendCode} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
              <FormInput
                id="signin-email"
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
                className="flex w-full items-center justify-between rounded-lg bg-[#00a8e8] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0090c7] disabled:opacity-60 transition cursor-pointer"
              >
                {loading ? "Sending…" : "Send code"}
                <FaArrowCircleRight aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        {/* BOTTOM / RIGHT HALF: SIGN UP */}
        <div
          className={`flex flex-col justify-center p-6 sm:p-8 lg:p-12 transition-all duration-700 ease-in-out ${
            !isSignUp
              ? "opacity-0 pointer-events-none translate-y-6 md:translate-y-0 md:translate-x-8"
              : "opacity-100 translate-y-0 md:translate-x-0"
          }`}
        >
          <p className="mb-2 md:mb-3 font-mono text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
            {email && isSignUp ? "Verify email" : "Sign up"}
          </p>
          <h1 className="font-space-grotesk text-2xl font-medium sm:text-3xl">
            {email && isSignUp ? "Check your inbox" : "Join the celebration"}
          </h1>

          {email && isSignUp ? (
            <form onSubmit={verifyCode} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
              <p className="font-manrope text-sm text-gray-300">
                We sent a six-digit code to {email}.
              </p>
              <OtpInput value={otp} onChange={setOtp} />
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="flex w-full items-center justify-between rounded-lg bg-[#00a8e8] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0090c7] disabled:opacity-60 transition cursor-pointer"
              >
                {loading ? "Verifying…" : "Verify email"}
                <FaArrowCircleRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setOtp("");
                }}
                className="font-manrope text-xs text-gray-400 hover:text-[#65c8ed] hover:underline cursor-pointer"
              >
                Use a different email
              </button>
            </form>
          ) : (
            <form onSubmit={sendCode} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
              <FormInput
                id="signup-name"
                name="name"
                label="Full name"
                icon={<FiUser size={18} />}
                autoComplete="name"
                required
                placeholder="Your full name"
              />
              <FormInput
                id="signup-email"
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
                className="flex w-full items-center justify-between rounded-lg bg-[#00a8e8] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0090c7] disabled:opacity-60 transition cursor-pointer"
              >
                {loading ? "Sending…" : "Join the celebration"}
                <FaArrowCircleRight aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        {/* =========================================================
            SLIDING OVERLAY PANEL
            - Mobile (< md): slides vertically (top <-> bottom)
            - Desktop (md+): slides horizontally (left <-> right)
           ========================================================= */}
        <div
          className={`absolute top-0 left-0 z-20 flex h-1/2 w-full md:h-full md:w-1/2 items-center justify-center overflow-hidden border-y md:border-y-0 md:border-x border-gray-800/80 bg-gradient-to-br from-[#0b2333] via-[#071822] to-[#06151D] shadow-xl shadow-black/30 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            isSignUp
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-y-0 md:translate-x-full"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,232,0.05),transparent_70%)]" />

          {/* Overlay content when in SIGN IN mode (invites to Sign Up) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 text-center transition-all duration-500 ${
              isSignUp
                ? "opacity-0 -translate-y-6 md:translate-y-0 md:-translate-x-10 pointer-events-none"
                : "opacity-100 translate-y-0 md:translate-x-0 delay-150"
            }`}
          >
            <h2 className="font-space-grotesk text-2xl sm:text-3xl font-medium">
              New to the celebration?
            </h2>
            <p className="mt-2.5 md:mt-3 font-manrope text-xs sm:text-sm text-gray-300 leading-relaxed">
              Create your account to register for events and be part of 40 years
              of LCC at UMinho.
            </p>
            <button
              type="button"
              onClick={() => resetToForm(true)}
              className="mt-5 md:mt-8 inline-flex items-center gap-3 rounded-lg border border-[#00a8e8]/60 bg-[#00a8e8]/5 px-5 py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold text-[#65c8ed] hover:bg-[#00a8e8] hover:text-white transition cursor-pointer"
            >
              <span>Create an account</span>
              <FaArrowCircleRight aria-hidden="true" />
            </button>
          </div>

          {/* Overlay content when in SIGN UP mode (invites to Sign In) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 text-center transition-all duration-500 ${
              !isSignUp
                ? "opacity-0 translate-y-6 md:translate-y-0 md:translate-x-10 pointer-events-none"
                : "opacity-100 translate-y-0 md:translate-x-0 delay-150"
            }`}
          >
            <h2 className="font-space-grotesk text-2xl sm:text-3xl font-medium">
              Already have an account?
            </h2>
            <p className="mt-2.5 md:mt-3 font-manrope text-xs sm:text-sm text-gray-300 leading-relaxed">
              Sign in with your email code to access your profile and event
              registrations.
            </p>
            <button
              type="button"
              onClick={() => resetToForm(false)}
              className="mt-5 md:mt-8 inline-flex items-center gap-3 rounded-lg border border-[#00a8e8]/60 bg-[#00a8e8]/5 px-5 py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold text-[#65c8ed] hover:bg-[#00a8e8] hover:text-white transition cursor-pointer"
            >
              <span>Sign in</span>
              <FaArrowCircleRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}