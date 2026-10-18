"use client";

import Image from "next/image";
import Link from "next/link";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { FaArrowCircleRight } from "react-icons/fa";

const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Animações
const slideLeft: any = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-25%" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const blurReveal: any = {
  initial: { opacity: 0, y: 50, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-25%" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function About() {
  return (
    <main className="bg-[#06151D] min-h-screen text-white relative selection:bg-[#00a8e8] selection:text-white overflow-x-hidden">
      {/* Navegação Global */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-16">
        <Nav />
      </div>

      {/* HERO / OUR HISTORY SECTION (Layout de 2 Colunas em Desktop) */}
      <section className="relative z-10 overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 border-b border-gray-800/40">
        {/* Background Grid com Máscara e Gradiente de Fusão */}
        <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />

        {/* Brilhos Radiais Suaves */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[10%] w-[600px] h-[600px] bg-[#00a8e8] rounded-full blur-[180px] z-0 pointer-events-none"
        />

        {/* Partículas a Piscar */}
        <span className="absolute top-[30%] left-[8%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[12%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1.5s]" />

        {/* Linha Laser/Scan Animada */}
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Coluna Esquerda: Título Fixado/Em Destaque */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="font-mono text-xs tracking-[0.2em] text-[#00a8e8] uppercase mb-4">
                OUR HISTORY
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
                How It All Began
              </h1>
            </div>

            {/* Coluna Direita: Texto da História */}
            <div className="lg:col-span-7 space-y-6 font-sans text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
              <p>
                It all started in 1986. Created by Ordinance No. 420/85, the
                degree was born under the designation Mathematics and Computer
                Science, with an initial four-and-a-half-year curriculum. It was
                the second information technology program at the University of
                Minho and immediately established its identity: approaching
                computing from its mathematical foundations, refusing to reduce
                it to the fleeting domain of temporary tools.
              </p>
              <p>
                The first graduates completed their path in 1990/91. Five years
                later, the curriculum underwent its first major revision,
                integrating the rapid advances redefining applied mathematics
                and computing.
              </p>
              <p>
                In 2006, with the transition to the Bologna model, the degree
                became the Bachelor's Degree in Computer Science, structured
                into three years. Duration and name changed, but the founding
                principle remained intact.
              </p>
              <p>
                More recently, in 2021, the degree once again renewed its
                curriculum matrix, integrating frontier areas such as Artificial
                Intelligence and Machine Learning in a structured way, ensuring
                that traditional theoretical rigor continues to power
                technological innovation.
              </p>
              <p className="text-white font-medium pt-4 border-t border-gray-800/60">
                Four decades and over a thousand graduates later, it is this
                same DNA that continues to define us. Those who pass through
                here don't just learn a language or a technology: they learn to
                dissect and structure problems in a lasting way. That is why our
                graduates adapt naturally to whatever comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE COURSE SECTION (Layout de 2 Colunas) */}
      <motion.section
        {...slideLeft}
        className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 md:py-24 max-w-[1400px] mx-auto border-b border-gray-800/40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.2em] text-[#00a8e8] uppercase mb-4">
              ABOUT THE COURSE
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Bachelor's Degree in Computer Science
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
              The Bachelor's Degree in Computer Science at the University of
              Minho prepares top-tier professionals capable of tackling the most
              demanding technological challenges of the present and the future.
            </p>
          </div>
        </div>
      </motion.section>

      {/* STATS SECTION */}
      <motion.section
        {...slideLeft}
        className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 max-w-[1400px] mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-gray-800/50 py-10">
          <div>
            <span className="font-heading text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              3 Years
            </span>
            <span className="font-mono text-gray-500 text-xs tracking-wider uppercase">
              Duration (6 Semesters)
            </span>
          </div>
          <div>
            <span className="font-heading text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              180
            </span>
            <span className="font-mono text-gray-500 text-xs tracking-wider uppercase">
              ECTS Credits
            </span>
          </div>
          <div>
            <span className="font-heading text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              Braga
            </span>
            <span className="font-mono text-gray-500 text-xs tracking-wider uppercase">
              Gualtar Campus
            </span>
          </div>
          <div>
            <span className="font-heading text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              100%
            </span>
            <span className="font-mono text-gray-500 text-xs tracking-wider uppercase">
              Employability
            </span>
          </div>
        </div>
      </motion.section>

      {/* ÁREAS DE CONHECIMENTO */}
      <motion.section
        {...slideLeft}
        className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 md:py-24 max-w-[1400px] mx-auto"
      >
        <h2 className="font-heading text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-12">
          Core Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-800/50">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-800/50 group hover:bg-white/[0.01] transition-colors">
            <h3 className="font-heading text-2xl font-medium mb-4 text-white group-hover:text-[#00a8e8] transition-colors">
              Algorithms & Theory
            </h3>
            <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed">
              A deep understanding of mathematical foundations, computational
              complexity, advanced algorithms, and high-performance data
              structures.
            </p>
          </div>

          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-800/50 group hover:bg-white/[0.01] transition-colors">
            <h3 className="font-heading text-2xl font-medium mb-4 text-white group-hover:text-[#00a8e8] transition-colors">
              Systems & Architecture
            </h3>
            <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed">
              Analysis and development of operating systems, communication
              networks, software engineering, and modern computer architectures.
            </p>
          </div>

          <div className="p-8 md:p-10 group hover:bg-white/[0.01] transition-colors">
            <h3 className="font-heading text-2xl font-medium mb-4 text-white group-hover:text-[#00a8e8] transition-colors">
              Artificial Intelligence & Data
            </h3>
            <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed">
              Exploration of machine learning, data analysis, computer graphics,
              and innovation-driven intelligent systems.
            </p>
          </div>
        </div>
      </motion.section>

      {/* OBJETIVOS E PERFIL DE SAÍDA */}
      <motion.section
        {...slideLeft}
        className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 md:py-20 max-w-[1400px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h2 className="font-heading text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-6">
              Course Objectives
            </h2>
            <p className="font-sans text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              The course aims to provide students with a solid foundational
              education in Computer Science, combining rigorous theoretical
              concepts with a strong hands-on laboratory component.
            </p>
            <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed">
              Graduates are empowered to design, implement, and maintain complex
              software systems with critical thinking and continuous
              adaptability to new technologies.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-6">
              Career Opportunities
            </h2>
            <ul className="font-sans text-gray-300 text-xs md:text-sm space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Software Engineering & Full-Stack Development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Research & Development (R&D) in Computing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Systems Architecture & Data Engineering</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Tech Consulting & Cybersecurity</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        {...blurReveal}
        className="relative py-20 text-white md:py-28 border-y border-gray-800/50 overflow-hidden"
      >
        <div className="bg-grid absolute inset-0 opacity-80 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />

        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#06151D] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />

        <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 mx-auto max-w-xl md:max-w-4xl">
          <p className="font-mono mb-6 text-[11px] sm:text-xs tracking-[0.2em] text-[#00a8e8] uppercase">
            Join the celebrations
          </p>

          <h2 className="font-sans mb-10 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-6xl md:leading-tight">
            Want to know more about the 40th Anniversary?
          </h2>

          <Link
            href="/"
            className="font-mono rounded-lg inline-flex items-center gap-3 bg-[#00a8e8] px-6 py-3.5 text-xs font-semibold text-white transition-all hover:bg-[#0090c7] md:text-sm"
          >
            <span>Back to homepage</span>
            <span>
              <FaArrowCircleRight />
            </span>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 pt-12 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}