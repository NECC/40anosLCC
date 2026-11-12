"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

import PromoSection from "@/components/promoSection";
import { navLinks } from "@/components/layout-content";
import { history } from "@/data/landing";

const EASE = [0.22, 1, 0.36, 1] as const;

type HistoryEvent = (typeof history)[number];

function HistoryTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="history"
      ref={timelineRef}
      className="bg-[#06151D] relative mx-auto w-full max-w-400 scroll-mt-20 px-4 py-24 sm:px-10 lg:px-16 lg:py-40"
    >
      {/* Cabeçalho da secção */}
      <div className="mb-20 flex flex-col items-center text-center md:mb-32">
        <span className="font-manrope text-xs font-semibold tracking-[0.3em] text-[#00a8e8] uppercase">
          Our history
        </span>
        <h2 className="mt-4 max-w-3xl font-space-grotesk text-4xl font-bold tracking-tight text-balance text-white md:text-6xl">
          Four decades, one timeline.
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Background line (Desktop & Mobile) */}
        <div className="absolute top-0 bottom-0 left-[13px] w-px bg-gray-800 md:left-1/2 md:-translate-x-1/2" />

        {/* Animated line (Linha animada com scroll) */}
        <motion.div
          style={{ scaleY: reduceMotion ? 1 : scaleY, transformOrigin: "top" }}
          className="absolute top-0 bottom-0 left-[13px] w-[2px] bg-[#00a8e8] shadow-[0_0_15px_rgba(0,168,232,0.5)] md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-20 md:space-y-32">
          {history.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.year}
                className="relative grid grid-cols-[28px_minmax(0,1fr)] items-center gap-x-5 md:grid-cols-[1fr_56px_1fr] md:gap-x-8"
              >
                {/* Mobile card com animação whileInView */}
                <motion.div
                  initial={reduceMotion ? {} : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: EASE,
                  }}
                  className="col-start-2 row-start-1 md:hidden"
                >
                  <TimelineCard event={event} />
                </motion.div>

                {/* Desktop card com animação alternada (esquerda/direita) */}
                <motion.div
                  initial={
                    reduceMotion
                      ? {}
                      : {
                          opacity: 0,
                          x: isLeft ? -60 : 60,
                        }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    ease: EASE,
                  }}
                  className={`hidden md:block md:row-start-1 ${
                    isLeft
                      ? "md:col-start-1 md:pr-12 text-left"
                      : "md:col-start-3 md:pl-12 text-left"
                  }`}
                >
                  <TimelineCard event={event} />
                </motion.div>

                {/* Timeline marker centralizado com efeito de escala e ping */}
                <motion.div
                  initial={reduceMotion ? {} : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="z-10 col-start-1 row-start-1 flex justify-center md:col-start-2"
                >
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#00a8e8] bg-[#06151D] shadow-[0_0_20px_rgba(0,168,232,0.2)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#00a8e8] shadow-[0_0_12px_#00a8e8]" />

                    <motion.div
                      initial={
                        reduceMotion ? {} : { scale: 0.5, opacity: 0 }
                      }
                      whileInView={
                        reduceMotion ? {} : { scale: 1.8, opacity: [0, 0.5, 0] }
                      }
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3,
                      }}
                      className="absolute inset-0 rounded-full border border-[#00a8e8]"
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ event }: { event: HistoryEvent }) {
  return (
    <div className="relative py-2 md:py-4">
      <h3 className="bg-[#00a8e8] bg-clip-text font-space-grotesk text-6xl lg:text-8xl leading-none font-bold tracking-tighter text-transparent tabular-nums">
        {event.year}
      </h3>
      <h4 className="mt-4 font-space-grotesk text-xl font-semibold text-white md:text-2xl">
        {event.title}
      </h4>
      <p className="mt-4 max-w-md font-manrope text-sm leading-relaxed text-gray-300 md:text-base">
        {event.description}
      </p>
    </div>
  );
}

const DAYS = [
  { weekday: "Mon", day: "1" },
  { weekday: "Tue", day: "2" },
  { weekday: "Wed", day: "3" },
];

const EVENT_START = new Date(2027, 2, 1);
const subscribe = () => () => {};
const getDaysToGo = () =>
  Math.ceil((EVENT_START.getTime() - Date.now()) / 86_400_000);

function Countdown() {
  const days = useSyncExternalStore(subscribe, getDaysToGo, () => null);
  if (days === null || days <= 0) return null;

  return (
    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
      <span className="size-2 animate-blink rounded-full bg-[#00a8e8]" />
      <p className="font-space-grotesk text-lg font-medium text-[#00a8e8] md:text-xl">
        <span className="text-3xl font-bold tabular-nums md:text-4xl">
          {days}
        </span>{" "}
        {days === 1 ? "day to go" : "days to go"}
      </p>
    </div>
  );
}

const BIT_COLUMNS = 14;

function bitColumn(seed: number, length = 40) {
  let s = seed * 2654435761;
  const bits: string[] = [];
  for (let i = 0; i < length; i++) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    bits.push((s >>> 16) & 1 ? "1" : "0");
  }
  return bits.join("\n");
}

const BIT_STREAMS = Array.from({ length: BIT_COLUMNS }, (_, i) => {
  const bits = bitColumn(i + 1);
  return {
    text: `${bits}\n${bits}`,
    duration: 40 + (i % 5) * 12,
    opacity: 0.07 + (i % 4) * 0.04,
  };
});

function BinaryRain({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex justify-between overflow-hidden px-4 font-mono text-sm leading-6 text-[#00a8e8] select-none [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_65%,transparent)] sm:px-10 lg:px-16"
    >
      {BIT_STREAMS.map((stream, i) => (
        <div
          key={i}
          className={i % 2 ? "hidden sm:block" : undefined}
          style={{ opacity: stream.opacity }}
        >
          <motion.pre
            animate={reduceMotion ? undefined : { y: ["0%", "-50%"] }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="whitespace-pre"
          >
            {stream.text}
          </motion.pre>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <main className="overflow-hidden bg-[#06151D]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-[#06151D] to-transparent" /> */}
        <BinaryRain reduceMotion={!!reduceMotion} />

        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-4%] hidden -translate-y-1/2 font-space-grotesk text-[34rem] leading-none font-bold tracking-tighter text-transparent select-none [-webkit-text-stroke:1px_rgba(0,168,232,0.14)] lg:block"
        >
          40
        </span>

        <div className="relative z-10 mx-auto w-full max-w-400 px-4 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-12 py-20 pt-36 md:flex-row md:gap-16 md:py-32 md:pt-44">
            <div className="w-full md:w-1/2">
              <motion.div {...rise(0)} className="mb-8 lg:hidden">
                <Image
                  src="/logocomtexto4oLCC.svg"
                  alt="40+ Logo"
                  width={200}
                  height={300}
                  className="h-auto w-28 md:w-32"
                />
              </motion.div>

              <motion.h1
                {...rise(0.1)}
                className="max-w-2xl font-space-grotesk text-5xl leading-[1.05] font-bold tracking-tight text-balance text-white md:text-6xl lg:text-7xl"
              >
                <span className="mb-6 block bg-[#00a8e8] bg-clip-text text-sm font-semibold tracking-widest text-transparent uppercase md:text-base">
                  March 1, 2 and 3, 2027
                </span>
                Four decades of{" "}
                <span className="bg-linear-to-r from-white via-[#8fdcff] to-[#00a8e8] bg-clip-text text-transparent">
                  Computer Science.
                </span>
              </motion.h1>

              <motion.p
                {...rise(0.18)}
                className="mt-6 max-w-lg font-manrope text-base leading-relaxed text-gray-300 md:text-lg"
              >
                Three days in Braga to celebrate our history, our people and
                what comes next.
              </motion.p>
              
              <motion.div {...rise(0.4)} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#history"
                  className="group flex w-full items-center justify-between gap-4 rounded-lg bg-[#00a8e8] px-6 py-3.5 font-manrope text-sm font-semibold text-[#06151D] shadow-[0_0_30px_rgba(0,168,232,0.35)] transition-all hover:bg-[#33bbf0] hover:shadow-[0_0_45px_rgba(0,168,232,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8] sm:w-auto"
                >
                  View schedule
                  <FaArrowCircleRight className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href={navLinks.SignUp}
                  className="flex w-full items-center justify-center rounded-lg border border-white/15 px-6 py-3.5 font-manrope text-sm font-semibold text-white transition-colors hover:border-[#00a8e8]/60 hover:bg-[#00a8e8]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8] sm:w-auto"
                >
                  Join event
                </Link>
              </motion.div>
            </div>

            <motion.div {...rise(0.35)} className="relative hidden lg:block lg:w-160">
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logocomtexto4oLCC.svg"
                  alt="40+ Logo"
                  width={200}
                  height={300}
                  priority
                  className="relative h-auto w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Link
          href="#history"
          aria-label="Scroll to history"
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 pt-2"
          >
            <span className="h-2 w-px rounded-full bg-[#00a8e8]" />
          </motion.span>
        </Link>
      </section>

      {/* History */}
      <HistoryTimeline />

      {/* Promo */}
      <PromoSection
        label="The next chapter starts now"
        title="40 years of history. A vision for the future."
        buttonText="Join the event"
        href={navLinks.SignUp}
      />
    </main>
  );
}