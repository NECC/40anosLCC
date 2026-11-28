"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { staggerItem } from "@/lib/animations";
import { Speaker } from "@/types";
import SpeakerAvatar from "@/components/speakerAvatar";
import SocialLinks from "@/components/socialLinks";

interface SpeakerRowProps {
  speaker: Speaker;
  isOpen: boolean;
  onToggle: () => void;
}

export default function SpeakerRow({
  speaker,
  isOpen,
  onToggle,
}: SpeakerRowProps) {
  const panelId = `bio-${speaker.id}`;

  return (
    <motion.li
      variants={staggerItem}
      className="flex gap-4 border-b border-gray-800/60 py-5 sm:gap-6"
    >
      <SpeakerAvatar name={speaker.name} photo={speaker.photo} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Name + socials */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 font-manrope">
            <h2 className="text-base font-semibold text-white md:text-lg">
              {speaker.name}
            </h2>
            <p className="mt-1 text-sm text-gray-300">{speaker.role}</p>
            <p className="text-sm text-gray-300">{speaker.company}</p>
          </div>

          <SocialLinks socials={speaker.socials} name={speaker.name} />
        </div>

        {/* Expandable bio */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.p
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden font-manrope text-sm leading-relaxed text-gray-200"
            >
              <span className="block pt-4">{speaker.bio}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Talk + time + toggle */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          <p className="font-manrope text-sm text-gray-400">
            {speaker.talk}{" "}
            <span className="ml-1 font-semibold whitespace-nowrap text-[#00a8e8]">
              {speaker.time}
            </span>
          </p>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={
              isOpen
                ? `Hide ${speaker.name}'s bio`
                : `Show ${speaker.name}'s bio`
            }
            className={`flex h-8 w-16 shrink-0 items-center justify-center rounded-full border text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a8e8] sm:w-20 ${
              isOpen
                ? "border-[#00a8e8] text-[#00a8e8]"
                : "border-gray-300 hover:border-[#00a8e8] hover:text-[#00a8e8]"
            }`}
          >
            {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
          </button>
        </div>
      </div>
    </motion.li>
  );
}
