"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { fadeInUp } from "@/lib/animations";
import PromoSection from "@/components/promoSection";
import { navLinks } from "@/components/layout-content";
import { history } from "@/data/landing";

function HistoryTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

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
      ref={timelineRef}
      className="relative mx-auto w-full max-w-400 px-4 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      {/* Timeline */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-0 bottom-0 left-[13px] w-px bg-gray-800 md:left-1/2 md:-translate-x-1/2" />

        {/* Animated line */}
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute top-0 bottom-0 left-[13px] w-[2px] bg-[#00a8e8] shadow-[0_0_15px_rgba(0,168,232,0.5)] md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-20 md:space-y-32">
          {history.map((event, index) => {
            const isLeft = event.side === "left";

            return (
              <div
                key={event.year}
                className="relative grid grid-cols-[28px_minmax(0,1fr)] items-center gap-x-5 md:grid-cols-[1fr_56px_1fr] md:gap-x-8"
              >
                {/* Mobile card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="col-start-2 row-start-1 md:hidden"
                >
                  <TimelineCard event={event} index={index} />
                </motion.div>

                {/* Desktop card */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -60 : 60,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`hidden md:block md:row-start-1 ${
                    isLeft
                      ? "md:col-start-1 md:pr-12"
                      : "md:col-start-3 md:pl-12"
                  }`}
                >
                  <TimelineCard event={event} index={index} />
                </motion.div>

                {/* Timeline marker */}
                <motion.div
                  initial={{ scale: 0 }}
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
                    <div className="h-2.5 w-2.5 rounded-full bg-[#00a8e8]" />

                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1.8, opacity: [0, 0.5, 0] }}
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

function TimelineCard({
  event,
  index,
}: {
  event: (typeof history)[number];
  index: number;
}) {
  return (
    <div className="relative py-7  md:py-8">
      <h3 className="mb-4 font-space-grotesk text-5xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#00a8e8] md:text-7xl lg:text-8xl">
        {event.year}
      </h3>
      <h4 className="mb-4 font-space-grotesk text-xl font-semibold text-gray-200 md:text-2xl">
        {event.title}
      </h4>
      <p className="max-w-lg font-manrope text-sm leading-relaxed text-gray-400 md:text-base">
        {event.description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#06151D]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 right-0 h-150 w-150 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#00a8e8]/10 blur-[150px]" />

        <div className="relative mx-auto flex min-h-[75vh] w-full max-w-400 items-center px-4 pt-32 pb-20 sm:px-10 lg:px-16 lg:pt-40">
          <div className="grid w-full items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
            {/* Hero text */}
            <motion.div {...fadeInUp} className="relative z-10">
              <h1 className="mb-7 max-w-3xl font-space-grotesk text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-7xl">
                Four decades of
                <span className="block text-[#00a8e8]">Computer Science.</span>
              </h1>

              <p className="mb-10 max-w-xl font-manrope text-base leading-relaxed text-gray-400 md:text-lg">
                Celebrating 40 years of knowledge, innovation and the
                generations that shaped Computer Science at the University of
                Minho.
              </p>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto flex w-full max-w-lg items-center justify-center"
            >
              <div className="relative z-10 flex aspect-square w-full items-center justify-center">
                <Image
                  src="/logocomtexto4oLCC.svg"
                  alt="40 Years of Computer Science"
                  width={600}
                  height={600}
                  priority
                  className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(0,168,232,0.15)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated history */}
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
