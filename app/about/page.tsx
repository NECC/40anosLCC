"use client";

import { motion } from "framer-motion";
import PromoSection from "@/components/promoSection";
import { FaLongArrowAltRight } from "react-icons/fa";
import { slideLeft, animateAllAtOnce } from "@/lib/animations";

export default function About() {
  return (
    <main className="bg-[#06151D] min-h-screen text-white relative selection:bg-[#00a8e8] selection:text-white">
      
      {/* 1. HERO SECTION: ABOUT THE COURSE */}
      <motion.section
        {...animateAllAtOnce}
        className="relative z-10 overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 border-b border-gray-800/40 transform-gpu"
      >
        {/* Background Grid com Máscara e Gradiente de Fusão */}
        <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#06151D] to-transparent pointer-events-none z-10" />

        {/* Brilho Radial Otimizado em CSS */}
        <div className="absolute top-[10%] left-[-10%] size-120 animate-glow rounded-full bg-[#00a8e8]/20 blur-[100px] pointer-events-none z-0" />

        {/* Partículas a Piscar */}
        <span className="absolute top-[30%] left-[8%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] pointer-events-none" />
        <span className="absolute bottom-[20%] right-[12%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1.5s] pointer-events-none" />

        {/* Linha Laser/Scan Animada */}
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)] pointer-events-none" />

        <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs tracking-[0.2em] text-[#00a8e8] uppercase mb-4">
                ABOUT THE COURSE
              </p>
              <h1 className="font-space-grotesk text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                Bachelor's Degree in <br className="hidden lg:block" /> Computer Science
              </h1>
            </div>
            <div className="lg:col-span-7 lg:pt-8">
              <p className="font-manrope text-base leading-relaxed text-gray-300 md:text-xl">
                The Bachelor's Degree in Computer Science at the University of
                Minho prepares top-tier professionals capable of tackling the most
                demanding technological challenges of the present and the future.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. STATS SECTION */}
      <motion.section
        {...animateAllAtOnce}
        className="relative z-10 px-2 sm:px-10 lg:px-16 py-12 md:py-16 max-w-400 mx-auto transform-gpu"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-800/50 pb-12">
          <div>
            <span className="font-space-grotesk text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              3 Years
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase md:text-sm">
              Duration (6 Semesters)
            </span>
          </div>
          <div>
            <span className="font-space-grotesk text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              180
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase md:text-sm">
              ECTS Credits
            </span>
          </div>
          <div>
            <span className="font-space-grotesk text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              Braga
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase md:text-sm">
              Gualtar Campus
            </span>
          </div>
          <div>
            <span className="font-space-grotesk text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2">
              100%
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase md:text-sm">
              Employability
            </span>
          </div>
        </div>
      </motion.section>

      {/* 3. CORE PILLARS */}
      <motion.section
        {...animateAllAtOnce}
        className="relative z-10 px-2 sm:px-10 lg:px-16 py-12 md:py-16 max-w-400 mx-auto transform-gpu"
      >
        <h2 className="font-space-grotesk text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-10">
          Core Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-800/50">
          <div className="group border-b border-gray-800/50 p-8 transition-colors md:border-r md:border-b-0 md:p-10">
            <h3 className="mb-4 font-space-grotesk text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8]">
              Algorithms & Theory
            </h3>
            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              A deep understanding of mathematical foundations, computational
              complexity, advanced algorithms, and high-performance data
              structures.
            </p>
          </div>
          <div className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10">
            <h3 className="mb-4 font-space-grotesk text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8]">
              Systems & Architecture
            </h3>
            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              Analysis and development of operating systems, communication
              networks, software engineering, and modern computer architectures.
            </p>
          </div>
          <div className="group p-8 md:p-10">
            <h3 className="mb-4 font-space-grotesk text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8]">
              Artificial Intelligence & Data
            </h3>
            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              Exploration of machine learning, data analysis, computer graphics,
              and innovation-driven intelligent systems.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4. OBJECTIVES & CAREER */}
      <motion.section
        {...animateAllAtOnce}
        className="relative z-10 px-2 sm:px-10 lg:px-16 py-12 md:py-16 max-w-400 mx-auto transform-gpu"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h2 className="font-space-grotesk text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-6">
              Course Objectives
            </h2>
            <p className="font-manrope text-base leading-relaxed text-gray-300 md:text-xl mb-6">
              The course aims to provide students with a solid foundational
              education in Computer Science, combining rigorous theoretical
              concepts with a strong hands-on laboratory component.
            </p>
            <p className="font-manrope text-xs leading-relaxed text-gray-400 md:text-sm">
              Graduates are empowered to design, implement, and maintain complex
              software systems with critical thinking and continuous
              adaptability to new technologies.
            </p>
          </div>

          <div>
            <h2 className="font-space-grotesk text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-6">
              Career Opportunities
            </h2>
            <ul className="font-manrope text-gray-300 text-xs md:text-sm space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold mt-1"><FaLongArrowAltRight /></span>
                <span>Software Engineering & Full-Stack Development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold mt-1"><FaLongArrowAltRight /></span>
                <span>Research & Development (R&D) in Computing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold mt-1"><FaLongArrowAltRight /></span>
                <span>Systems Architecture & Data Engineering</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold mt-1"><FaLongArrowAltRight /></span>
                <span>Tech Consulting & Cybersecurity</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* 5. OUR HISTORY (Overflow-hidden removido para não cortar o brilho) */}
      <motion.section
        {...animateAllAtOnce}
        className="relative z-10 px-2 sm:px-10 lg:px-16 py-16 md:py-32 max-w-400 mx-auto transform-gpu"
      >
        {/* Brilho Radial - Canto Superior Esquerdo */}
        <div className="absolute top-[10%] left-[-10%] size-120 animate-glow rounded-full bg-[#00a8e8]/20 blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[-10%] size-120 animate-glow rounded-full bg-[#00a8e8]/20 blur-[100px] pointer-events-none z-0" />

        {/* Partículas a Piscar */}
        <span className="absolute top-[30%] left-[8%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] pointer-events-none" />
        <span className="absolute bottom-[50%] right-[12%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1.5s] pointer-events-none" />

        {/* Adicionado relative e z-10 para o conteúdo ficar acima dos brilhos */}
        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
          {/* Cabeçalho Centrado */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-mono text-xs tracking-[0.2em] text-gray-500 uppercase mb-4">
              Legacy
            </p>
            <h2 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight">
              How It All Began
            </h2>
          </div>

          {/* Texto Centrado / Contido Limpo (Sem borders adicionais) */}
          <div className="space-y-6 font-manrope text-base leading-relaxed text-gray-300 md:text-lg">
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
              More recently, in 2024, the degree once again renewed its
              curriculum matrix, integrating frontier areas such as Artificial
              Intelligence and Machine Learning in a structured way, ensuring
              that traditional theoretical rigor continues to power
              technological innovation.
            </p>
            <p>
              Four decades and over two thousand graduates later, it is this
              same DNA that continues to define us. Those who pass through
              here don't just learn a language or a technology: they learn to
              dissect and structure problems in a lasting way. That is why our
              graduates adapt naturally to whatever comes next.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 6. PROMO SECTION */}
      <PromoSection
        label="Join the celebrations"
        title="Want to know more about the 40th Anniversary?"
        buttonText="Back to homepage"
        href="/"
      />
    </main>
  );
}