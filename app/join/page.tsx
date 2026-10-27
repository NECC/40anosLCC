"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiCalendar, FiLock, FiMail, FiUser } from "react-icons/fi";
import CheckboxInput from "@/components/inputs/checkboxInput";
import FormInput from "@/components/inputs/formInput";

export default function JoinPage() {
  const [isComputerScienceStudent, setIsComputerScienceStudent] =
    useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", event);
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
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-[#00a8e8] uppercase font-bold">
            Sign up
          </p>
          <h1 className="font-space-grotesk text-2xl font-medium sm:text-3xl">
            Join the celebration
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              required
              placeholder="Create a password"
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
                href="/sign-in"
                className="text-[#65c8ed] underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="submit"
                className="flex flex-1 items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#0090c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8]"
              >
                Join the celebration
                <FaArrowCircleRight aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
