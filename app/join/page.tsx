"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  // Login states
  const [loginEmail, setLoginEmail] = useState("");

  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { loginEmail });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", { regName, regEmail });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#040e14] text-white overflow-hidden selection:bg-[#00d8f6] selection:text-[#040e14]">
      {/* Background grid + Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 216, 246, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 216, 246, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-[#00d8f6]/15 blur-[120px]" />

      {/* Fixed Top Header (Logo on left, Go back button on right) */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-12">
        <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-[#071822]/90 px-4 py-2 font-mono text-xs font-medium tracking-wider text-slate-300 hover:border-[#00d8f6] hover:text-white transition"
        >
          <FaArrowLeft className="h-3 w-3" />
          <span>Back to Home</span>
        </Link>
        </div>
      </header>

      {/* =========================================================
          DESKTOP VERSION: SPLIT-SCREEN WITH SLIDING OVERLAY (md+)
         ========================================================= */}
      <div className="relative hidden md:grid md:grid-cols-2 min-h-screen w-full">
        {/* LEFT HALF: SIGN IN FORM */}
        <div
          className={`flex flex-col justify-center px-12 lg:px-24 xl:px-32 transition-all duration-700 ease-in-out ${
            isRegister
              ? "opacity-0 pointer-events-none -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Sign In
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Access your account to check the event.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] font-semibold tracking-[0.15em] text-slate-300 mb-1.5">
                  INSTITUTIONAL / PERSONAL EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@lcc.uminho.pt"
                  className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00d8f6]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-[#00d8f6] py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-[#040e14] shadow-[0_0_25px_rgba(0,216,246,0.4)] hover:bg-[#2be3fc] transition cursor-pointer"
              >
                <span>SIGN IN</span>
                <FaArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT HALF: SIGN UP FORM */}
        <div
          className={`flex flex-col justify-center px-12 lg:px-24 xl:px-32 transition-all duration-700 ease-in-out ${
            !isRegister
              ? "opacity-0 pointer-events-none translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-slate-300">
                Join the celebration of the 40 years of LCC
            </p>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] font-semibold tracking-[0.15em] text-slate-300 mb-1.5">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Alan Turing"
                  className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00d8f6]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] font-semibold tracking-[0.15em] text-slate-300 mb-1.5">
                  INSTITUTIONAL / PERSONAL EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="student@lcc.uminho.pt"
                  className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00d8f6]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-[#00d8f6] py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-[#040e14] shadow-[0_0_25px_rgba(0,216,246,0.4)] hover:bg-[#2be3fc] transition cursor-pointer"
              >
                <span>SIGN UP</span>
                <FaArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* =========================================================
            SLIDING OVERLAY PANEL (MOVES BETWEEN LEFT AND RIGHT)
           ========================================================= */}
        <div
          className={`absolute top-0 left-0 z-20 h-full w-1/2 border-x border-[#00d8f6]/35 bg-gradient-to-br from-[#071d29] via-[#05141d] to-[#040e14] shadow-[0_0_60px_rgba(0,216,246,0.12)] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] flex items-center justify-center overflow-hidden ${
            isRegister ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Inner panel glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,216,246,0.16),transparent_68%)]" />

          {/* Content when in SIGN IN mode (panel on right -> invites to Sign Up) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-12 text-center transition-all duration-500 ${
              isRegister
                ? "opacity-0 -translate-x-12 pointer-events-none"
                : "opacity-100 translate-x-0 delay-150"
            }`}
          >

            <h2 className="text-4xl lg:text-5xl font-black tracking-tight uppercase text-white">
              HELLO, FRIEND
            </h2>
            <p className="mt-4 max-w-sm text-sm text-slate-300 leading-relaxed">
              Don&apos;t have an account yet? Register now and join the
              celebration of four decades of LCC at UMinho.
            </p>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className="mt-8 rounded-lg border border-[#00d8f6] bg-[#00d8f6]/10 px-8 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-[#00d8f6] shadow-[0_0_25px_rgba(0,216,246,0.2)] hover:bg-[#00d8f6] hover:text-[#040e14] transition-all cursor-pointer"
            >
              SIGN UP
            </button>
          </div>

          {/* Content when in SIGN UP mode (panel on left -> invites to Sign In) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-12 text-center transition-all duration-500 ${
              !isRegister
                ? "opacity-0 translate-x-12 pointer-events-none"
                : "opacity-100 translate-x-0 delay-150"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight uppercase text-white">
              WELCOME BACK
            </h2>
            <p className="mt-4 max-w-sm text-sm text-slate-300 leading-relaxed">
              Already have an account? Sign in to access your registrations and
              upcoming events.
            </p>
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className="mt-8 rounded-lg border border-[#00d8f6] bg-[#00d8f6]/10 px-8 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-[#00d8f6] shadow-[0_0_25px_rgba(0,216,246,0.2)] hover:bg-[#00d8f6] hover:text-[#040e14] transition-all cursor-pointer"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE VERSION (< md): TAB SWITCHER
         ========================================================= */}
      <main className="relative z-10 flex md:hidden flex-col justify-center min-h-screen w-full max-w-md mx-auto px-6 pt-24 pb-10">
        <div className="inline-flex self-start items-center rounded-full border border-[#00d8f6]/40 bg-[#00d8f6]/10 px-3 py-1 mb-4">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#00d8f6]">
            1984 — 2024
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          {!isRegister ? "Welcome Back" : "Create Account"}
        </h1>

        <div className="mt-6 grid grid-cols-2 rounded-lg border border-cyan-500/30 bg-[#06151e] p-1">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2.5 font-mono text-xs font-bold tracking-[0.15em] rounded-md transition-all ${
              !isRegister
                ? "bg-[#00d8f6] text-[#040e14]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-2.5 font-mono text-xs font-bold tracking-[0.15em] rounded-md transition-all ${
              isRegister
                ? "bg-[#00d8f6] text-[#040e14]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            SIGN UP
          </button>
        </div>

        {!isRegister ? (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="student@lcc.uminho.pt"
              className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#00d8f6] py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-[#040e14]"
            >
              SIGN IN
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <input
              type="text"
              required
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900"
            />
            <input
              type="email"
              required
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="student@lcc.uminho.pt"
              className="w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#00d8f6] py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-[#040e14]"
            >
              SIGN UP
            </button>
          </form>
        )}
      </main>
    </div>
  );
}