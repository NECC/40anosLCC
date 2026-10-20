"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";

import {
  slideLeft,
  blurReveal,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export default function Home() {
  return (
    <main className="bg-[#06151D]">
      <section className="relative z-10 overflow-hidden md:h-[50vh] lg:h-[70vh]">
        <div className="bg-grid absolute inset-0 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-[#06151D] to-transparent" />

        <div className="absolute top-[55%] left-0 size-72 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] md:size-96" />

        <div className="absolute top-0 right-0 size-80 translate-x-1/3 -translate-y-1/3 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] [animation-delay:3s] md:size-112" />

        <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />

        <span className="absolute right-[10%] bottom-[20%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />

        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <motion.div
          {...fadeInUp}
          className="relative z-10 mx-auto flex h-full w-full max-w-400 items-center justify-center px-2 sm:px-10 lg:px-16"
        >
          <div className="relative z-10 mx-auto flex h-full w-full max-w-400 items-center justify-center">
            <div className="flex flex-col items-center justify-between gap-12 py-20 pt-32 md:flex-row md:gap-16 md:py-28">
              <div className="relative z-10 w-full md:w-1/2">
                <h1 className="mb-6 font-space-grotesk text-xl leading-snug font-medium text-white md:text-2xl md:leading-normal lg:text-3xl">
                  Three days with the entire community and the companies that
                  are part of this story.
                </h1>

                <p className="mb-8 font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase md:text-xs">
                  MARCH 1, 2 AND 3, 2026 • BRAGA
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href=""
                    className="flex w-full items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-xs font-semibold text-white transition-all hover:bg-[#0090c7] sm:w-auto md:text-sm"
                  >
                    View Schedule
                    <FaArrowCircleRight />
                  </Link>

                  <Link
                    href=""
                    className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-800 bg-[#040d14] px-6 py-3.5 font-manrope text-xs font-semibold text-gray-300 transition-all hover:bg-gray-900/50 sm:w-auto md:text-sm"
                  >
                    Join Event
                    <FaArrowCircleRight />
                  </Link>
                </div>
              </div>

              <Image
                src="/logocomtexto4oLCC.svg"
                alt="40+ Logo"
                width={200}
                height={300}
                className="relative z-10 hidden h-auto lg:block lg:w-160"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        {...slideLeft}
        className="mx-auto w-full max-w-400 px-2 py-16 sm:px-10 md:py-24 lg:px-16"
      >
        <h2 className="mb-8 font-space-grotesk text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-12">
          History
        </h2>

        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="font-manrope text-base leading-relaxed text-gray-300 md:text-xl">
            Since 1986, thousands of people have passed through our classrooms,
            labs, and projects. Every generation has added a new line to this
            story.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-b border-gray-800/50 md:grid-cols-3">
          <div className="flex flex-col justify-center border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-12">
            <h3 className="mb-2 font-space-grotesk text-4xl font-light text-[#00a8e8] md:text-6xl">
              1986
            </h3>

            <p className="font-manrope text-xs text-gray-500 md:text-sm">
              The first chapter
            </p>
          </div>

          <div className="flex flex-col justify-center gap-8 border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-12">
            <p className="border-b border-gray-800/50 pb-8 font-manrope text-sm leading-relaxed text-gray-300">
              The degree was born at a time when computing was beginning to
              reshape the world. At the University of Minho, it found a place to
              grow with rigor, curiosity, and ambition.
            </p>

            <p className="font-manrope text-sm leading-relaxed text-gray-300">
              Today, the same energy connects alumni, students, faculty,
              researchers, and companies in a community open to what has yet to
              be invented.
            </p>
          </div>

          <div className="flex flex-col items-end justify-center p-8 text-right md:p-12">
            <h3 className="mb-2 font-space-grotesk text-4xl font-light text-[#00a8e8] md:text-6xl">
              2026
            </h3>

            <p className="font-manrope text-xs text-gray-500 md:text-sm">
              The future continues
            </p>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto w-full max-w-400 px-2 py-16 sm:px-10 md:py-24 lg:px-16">
        <motion.div
          {...slideLeft}
          className="mb-10 flex items-center justify-between md:mb-16"
        >
          <h2 className="font-space-grotesk text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
            PROGRAM
          </h2>

          <Link
            href=""
            className="flex items-center gap-3 rounded-lg border border-gray-800/80 bg-transparent px-5 py-2.5 font-mono text-xs text-gray-300 transition-colors hover:border-gray-600 hover:text-white md:text-sm"
          >
            Full schedule
            <FaArrowCircleRight />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-25%" }}
          className="grid grid-cols-1 border-t border-b border-gray-800/50 md:grid-cols-3"
        >
          <motion.div
            variants={staggerItem}
            className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10 lg:p-12"
          >
            <h3 className="mb-6 font-space-grotesk text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Stands
            </h3>

            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              An open space throughout the event to connect with students,
              showcase the organization, and find future team members.
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10 lg:p-12"
          >
            <h3 className="mb-6 font-space-grotesk text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Talks
            </h3>

            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              An auditorium session to present the organization&apos;s work,
              vision, and challenges before an attentive and engaged audience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="group p-8 md:p-10 lg:p-12"
          >
            <h3 className="mb-6 font-space-grotesk text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Workshops
            </h3>

            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              A hands-on session in small groups to demonstrate everyday tools,
              methods, and ideas up close.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* PARTNERS
      <motion.section
        {...zoomIn}
        className="mx-auto w-full max-w-400 px-2 py-16 sm:px-10 md:py-24 lg:px-16"
      >
        <h2 className="mb-16 text-left font-space-grotesk text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-20">
          Partners
        </h2>

        <div className="mx-auto max-w-5xl space-y-16 md:space-y-24">
          {(["Gold", "Silver", "Bronze"] as const).map((tier) => {
            const partners = partnersData.filter(
              (partner) => partner.tier === tier,
            );

            if (partners.length === 0) return null;

            const tierColors = {
              Gold: "#D4AF37",
              Silver: "#A9A9A9",
              Bronze: "#CD7F32",
            };

            return (
              <div key={tier} className="text-center">
                <h3
                  className="mb-10 font-space-grotesk text-lg font-bold tracking-[0.3em] uppercase md:mb-12"
                  style={{ color: tierColors[tier] }}
                >
                  {tier}
                </h3>

                <div className="grid grid-cols-2 items-end justify-items-center gap-x-15 gap-y-12 md:flex md:flex-wrap md:justify-center md:gap-16">
                  {partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="group flex flex-col items-center gap-3"
                    >
                      <div className="flex h-12 items-center justify-center md:h-20">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={100}
                          height={100}
                          className="max-h-12 w-auto object-contain opacity-40 transition-opacity group-hover:opacity-100 md:max-h-32"
                        />
                      </div>

                      <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
      */}

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

        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center md:max-w-4xl">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-[#00a8e8] uppercase sm:text-xs">
            The next chapter starts now
          </p>

          <h2 className="mb-10 font-space-grotesk text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-6xl md:leading-tight">
            40 years of history.
            <br />
            <span>A vision for the</span>
            <br className="block md:hidden" />
            <span> future.</span>
          </h2>

          <Link
            href=""
            className="flex w-full items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-xs font-semibold text-white transition-all hover:bg-[#0090c7] sm:w-auto md:text-sm"
          >
            Join the event
            <FaArrowCircleRight />
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
