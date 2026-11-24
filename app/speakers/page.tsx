"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaLinkedin,
  FaMinus,
  FaPlus,
  FaXTwitter,
} from "react-icons/fa6";

import { staggerContainer, staggerItem } from "@/lib/animations";
import { eventDays } from "@/data/speakers";
import { Speaker } from "@/types";
import SpeakerAvatar from "@/components/speakerAvatar";
import SocialLinks from "@/components/socialLinks";
import SpeakerRow from "@/components/speakerRow";

export default function Speakers() {
  const [dayIndex, setDayIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1); // NEW

  const day = eventDays[dayIndex];
  const isFirst = dayIndex === 0;
  const isLast = dayIndex === eventDays.length - 1;

  const changeDay = (next: number) => {
    setDirection(next > dayIndex ? 1 : -1);
    setOpenId(null);
    setDayIndex(next);
  };

  const SWIPE_DISTANCE = 60;
  const SWIPE_VELOCITY = 400;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;

    if (
      (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) &&
      !isLast
    ) {
      changeDay(dayIndex + 1);
    } else if (
      (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) &&
      !isFirst
    ) {
      changeDay(dayIndex - 1);
    }
  };

  return (
    <main className="relative overflow-hidden bg-[#06151D]">
      {/* Background glow, same language as the home hero */}
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[60vh] mask-[linear-gradient(to_bottom,black_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute top-0 left-0 size-80 -translate-x-1/3 -translate-y-1/3 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] md:size-112" />

      <section className="relative z-10 mx-auto w-full max-w-400 px-2 pt-32 pb-16 sm:px-10 md:pb-24 lg:px-16">
        <h1 className="sr-only">Speakers</h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          {/* ------------------------------ LEFT ------------------------------ */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-space-grotesk text-lg text-[#00a8e8] md:text-xl">
              Happening on
            </p>

            <div className="mt-2 flex items-center justify-between gap-6 lg:justify-start lg:gap-16">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={day.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="font-space-grotesk text-6xl font-medium text-white md:text-7xl"
                  aria-live="polite"
                >
                  {day.day} {day.month}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center gap-2 text-gray-300">
                <button
                  type="button"
                  onClick={() => changeDay(dayIndex - 1)}
                  disabled={isFirst}
                  aria-label="Previous day"
                  className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#00a8e8] disabled:pointer-events-none disabled:opacity-30"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => changeDay(dayIndex + 1)}
                  disabled={isLast}
                  aria-label="Next day"
                  className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#00a8e8] disabled:pointer-events-none disabled:opacity-30"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="mt-10 max-w-sm space-y-4 font-manrope text-sm leading-relaxed text-gray-300">
              <p>
                Over these days you can talk to recognised speakers from
                national and international companies.
              </p>
              <p>Get to know them better here.</p>
            </div>
          </div>

          {/* Elementos da Direita */}
          <motion.div
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              key={day.id}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="border-t border-gray-800/60"
              >
                {day.speakers.map((speaker) => (
                  <SpeakerRow
                    key={speaker.id}
                    speaker={speaker}
                    isOpen={openId === speaker.id}
                    onToggle={() =>
                      setOpenId((prev) =>
                        prev === speaker.id ? null : speaker.id,
                      )
                    }
                  />
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
