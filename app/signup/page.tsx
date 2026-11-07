"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiCalendar, FiHash, FiLock, FiMail, FiUser } from "react-icons/fi";
import CheckboxInput from "@/components/inputs/checkboxInput";
import FormInput from "@/components/inputs/formInput";
import { navLinks } from "@/components/layout-content";
import { useSession } from "@/lib/auth/auth-client";

export default function JoinPage() {
  const router = useRouter();
  const { refetch: refetchSession } = useSession();
  const [isComputerScienceStudent, setIsComputerScienceStudent] =
    useState(false);

  const [details, setDetails] = useState<{
    name: string;
    email: string;
    password: string;
    isStudent: boolean;
    studyYear: number | null;
  } | null>(null);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const signUpDetails = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      isStudent: isComputerScienceStudent,
      studyYear: isComputerScienceStudent
        ? Number(formData.get("studyYear"))
        : null,
    };

    try {
      await axios.post("/api/sign-up", signUpDetails);

      setDetails(signUpDetails);
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!details) return;

    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await axios.post("/api/sign-up/verify", {
        ...details,
        otp: String(formData.get("otp") ?? ""),
      });

      await refetchSession();
      router.push(navLinks.Profile);
      router.refresh();
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
    } finally {
      setIsSubmitting(false);
    }
  };

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

              <FormInput
                id="password"
                name="password"
                label="Password"
                icon={<FiLock size={18} />}
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
                placeholder="At least 8 characters"
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                <CheckboxInput
                  id="computer-science-student"
                  name="computerScienceStudent"
                  label="I'm a Computer Science student"
                  checked={isComputerScienceStudent}
                  onChange={(event) =>
                    setIsComputerScienceStudent(event.target.checked)
                  }
                  className="mt-1"
                />
                <div
                  aria-hidden={!isComputerScienceStudent}
                  className={`relative grid min-w-0 transition-[grid-template-rows,opacity] duration-200 ease-out sm:grid-rows-[1fr] ${
                    isComputerScienceStudent
                      ? "grid-rows-[1fr] visible"
                      : "pointer-events-none grid-rows-[0fr] hidden"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-0 hidden h-full w-px bg-gray-700/70 sm:block"
                  />
                  <FormInput
                    id="study-year"
                    name="studyYear"
                    label="Year of study"
                    icon={<FiCalendar size={18} />}
                    options={["1", "2", "3"]}
                    placeholder="Select year"
                    disabled={!isComputerScienceStudent}
                    required={isComputerScienceStudent}
                  />
                </div>
              </div>
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
                <p className="font-manrope text-sm text-red-400">An error occurred while processing your request.</p>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex flex-1 items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#0090c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Loading..." : "Join the celebration"}
                  <FaArrowCircleRight aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
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
      "Unable to process the request"
    );
  }

  return error instanceof Error ? error.message : "Something went wrong";
}
