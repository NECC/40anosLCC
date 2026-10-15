"use client";

import Image from "next/image";
import Link from "next/link";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";

const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const blueFilterClass =
  "[filter:brightness(0)_saturate(100%)_invert(53%)_sepia(83%)_saturate(1748%)_hue-rotate(162deg)_brightness(98%)_contrast(101%)]";

export default function About() {
  return (
    <main className="min-h-screen bg-[#06131c] text-white font-sans relative overflow-x-hidden selection:bg-[#00a8e8] selection:text-white">
      {/* BACKGROUND ANIMAÇÃO: Grelha de Fundo */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:80px_80px] h-[100vh] opacity-40"></div>

      {/* Brilhos Radiais */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-10%] top-[10%] w-[600px] h-[600px] bg-[#00a8e8] rounded-full blur-[180px] z-0 pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute right-[-10%] top-[20%] w-[550px] h-[550px] bg-[#00a8e8] rounded-full blur-[180px] z-0 pointer-events-none"
      />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-16 border-b border-white/5">
        <div className="flex items-center text-[#00a8e8]">
          <Link href="/">
            <Image
              src="/40AnosLogo2.svg"
              alt="Logo 40 Anos"
              width={48}
              height={48}
              className={`opacity-90 ${blueFilterClass}`}
            />
          </Link>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm font-light text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">
            Início
          </Link>
          <Link href="/#programa" className="hover:text-white transition-colors">
            Programa
          </Link>
          <Link href="/#empresas" className="hover:text-white transition-colors">
            Empresas
          </Link>
          <div className="flex flex-col items-center gap-1">
            <Link href="/about" className="text-white">
              About
            </Link>
            <div className="w-1 h-1 bg-[#00a8e8] rounded-full"></div>
          </div>
        </nav>

        {/* CTA Entrar Desktop */}
        <div className="hidden md:block text-xs font-semibold tracking-widest text-gray-300 hover:text-white transition-colors">
          <Link href="/#entrar" className="flex items-center gap-2">
            ENTRAR <span className="text-[#00a8e8]">→</span>
          </Link>
        </div>

        {/* Menu Mobile */}
        <button className="md:hidden text-gray-300" aria-label="Abrir Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* HERO DA PÁGINA ABOUT */}
      <section className="relative z-10 px-6 md:px-16 pt-20 pb-16 md:pt-28 md:pb-24 max-w-[1600px] mx-auto">
        <div className="max-w-3xl">
          <p
            className={`${dmMono.className} text-[#00a8e8] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4`}
          >
            SOBRE O CURSO
          </p>
          <h1
            className={`${spaceGrotesk.className} text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8 text-white`}
          >
            Licenciatura em Ciências da Computação
          </h1>
          <p
            className={`${manrope.className} text-gray-300 text-base md:text-xl leading-relaxed font-light`}
          >
            A Licenciatura em Ciências da Computação da Universidade do Minho
            prepara profissionais de excelência capazes de responder aos desafios
            tecnológicos mais exigentes do presente e do futuro.
          </p>
        </div>
      </section>

      {/* DADOS CHAVE E MÉTRICAS */}
      <section className="relative z-10 px-6 md:px-16 py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-gray-800/50 py-10">
          <div>
            <span
              className={`${spaceGrotesk.className} text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2`}
            >
              3 Anos
            </span>
            <span
              className={`${dmMono.className} text-gray-400 text-xs tracking-wider uppercase`}
            >
              Duração (6 Semestres)
            </span>
          </div>
          <div>
            <span
              className={`${spaceGrotesk.className} text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2`}
            >
              180
            </span>
            <span
              className={`${dmMono.className} text-gray-400 text-xs tracking-wider uppercase`}
            >
              Créditos ECTS
            </span>
          </div>
          <div>
            <span
              className={`${spaceGrotesk.className} text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2`}
            >
              Braga
            </span>
            <span
              className={`${dmMono.className} text-gray-400 text-xs tracking-wider uppercase`}
            >
              Campus de Gualtar
            </span>
          </div>
          <div>
            <span
              className={`${spaceGrotesk.className} text-3xl md:text-5xl text-[#00a8e8] font-light block mb-2`}
            >
              100%
            </span>
            <span
              className={`${dmMono.className} text-gray-400 text-xs tracking-wider uppercase`}
            >
              Empregabilidade
            </span>
          </div>
        </div>
      </section>

      {/* ÁREAS DE CONHECIMENTO */}
      <section className="relative z-10 px-6 md:px-16 py-16 md:py-24 max-w-[1600px] mx-auto">
        <h2
          className={`${spaceGrotesk.className} text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-12`}
        >
          Pilares Fundamentais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-800/50">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-800/50 group">
            <h3
              className={`${spaceGrotesk.className} text-2xl font-medium mb-4 text-white group-hover:text-[#00a8e8] transition-colors`}
            >
              Algoritmos & Teoria
            </h3>
            <p
              className={`${manrope.className} text-gray-400 text-sm leading-relaxed`}
            >
              Compreensão profunda das fundações matemáticas, complexidade
              computacional, algoritmos avançados e estruturas de dados de alto
              desempenho.
            </p>
          </div>

          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-800/50 group">
            <h3
              className={`${spaceGrotesk.className} text-2xl font-medium mb-4 text-white group-hover:text-[#00a8e8] transition-colors`}
            >
              Sistemas & Arquitetura
            </h3>
            <p
              className={`${manrope.className} text-gray-400 text-sm leading-relaxed`}
            >
              Análise e desenvolvimento de sistemas operativos, redes de
              comunicação, engenharia de software e arquiteturas de computadores
              modernas.
            </p>
          </div>

          <div className="p-8 md:p-10 group">
            <h3
              className={`${spaceGrotesk.className} text-2xl font-medium mb-4 text-white group-hover:text-[#00a8e8] transition-colors`}
            >
              Inteligência Artificial & Dados
            </h3>
            <p
              className={`${manrope.className} text-gray-400 text-sm leading-relaxed`}
            >
              Exploração de aprendizagem automática, análise de dados, computação
              gráfica e sistemas inteligentes orientados para a inovação.
            </p>
          </div>
        </div>
      </section>

      {/* OBJETIVOS E PERFIL DE SAÍDA */}
      <section className="relative z-10 px-6 md:px-16 py-16 md:py-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h2
              className={`${spaceGrotesk.className} text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-6`}
            >
              Objetivos do Curso
            </h2>
            <p
              className={`${manrope.className} text-gray-300 text-base md:text-lg leading-relaxed mb-6`}
            >
              O curso visa dotar os estudantes de uma sólida formação de base em
              Ciências da Computação, combinando conceitos teóricos rigorosos
              com uma forte componente prática em laboratório.
            </p>
            <p
              className={`${manrope.className} text-gray-400 text-sm md:text-base leading-relaxed`}
            >
              Os diplomados ficam capacitados para desenhar, implementar e
              manter sistemas de software complexos, com capacidade crítica e de
              adaptação contínua às novas tecnologias.
            </p>
          </div>

          <div>
            <h2
              className={`${spaceGrotesk.className} text-[#00a8e8] text-lg font-bold tracking-[0.2em] uppercase mb-6`}
            >
              Saídas Profissionais
            </h2>
            <ul
              className={`${manrope.className} text-gray-300 text-sm md:text-base space-y-4`}
            >
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Engenharia de Software e Desenvolvimento Full-Stack</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Investigação e Desenvolvimento (I&D) em Computação</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Arquitetura de Sistemas e Engenharia de Dados</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a8e8] font-bold">→</span>
                <span>Consultoria Tecnológica e Cibersegurança</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 px-6 md:px-16 py-28 md:py-36 flex flex-col items-center text-center max-w-[1600px] mx-auto">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:80px_80px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_20%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <p
            className={`${dmMono.className} text-[#00a8e8] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6`}
          >
            Junta-te às comemorações
          </p>
          <h2
            className={`${manrope.className} text-3xl md:text-5xl font-medium tracking-tight mb-8 md:mb-10`}
          >
            Queres saber mais sobre os 40 Anos?
          </h2>
          <Link
            href="/"
            className={`${dmMono.className} bg-[#00a8e8] hover:bg-[#0090c7] text-white px-8 py-4 md:py-5 text-sm font-semibold flex items-center justify-center gap-6 transition-all w-full md:w-auto`}
          >
            Voltar à página principal <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}