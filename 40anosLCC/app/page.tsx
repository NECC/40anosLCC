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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06131c] text-white font-sans relative overflow-x-hidden selection:bg-[#00a8e8] selection:text-white">
      {/* BACKGROUND ANIMAÇÃO: Grelha de Fundo */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:80px_80px] h-[100vh] opacity-40"></div>
      
      {/* Brilho Radial Canto Superior Esquerdo */}
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
        className="absolute left-[-10%] top-[15%] w-[600px] h-[600px] bg-[#00a8e8] rounded-full blur-[180px] z-0 pointer-events-none"
      />
      
      {/* Brilho Radial Canto Superior Direito */}
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
        className="absolute right-[-10%] top-[5%] w-[550px] h-[550px] bg-[#00a8e8] rounded-full blur-[180px] z-0 pointer-events-none"
      />
      
      {/* Partícula Flutuante 1 (Lado Esquerdo) */}
      <motion.div
        animate={{
          y: [0, -25, 10, 0],
          x: [0, 15, -10, 0],
          opacity: [0.3, 0.9, 0.4, 0.3],
          scale: [0.8, 1.2, 0.9, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[12%] top-[22%] w-2 h-2 bg-[#00a8e8] rounded-full shadow-[0_0_12px_#00a8e8] z-10 pointer-events-none"
      />
      
      {/* Partícula Flutuante 2 (Canto Superior Direito) */}
      <motion.div
        animate={{
          y: [0, 20, -15, 0],
          x: [0, -15, 10, 0],
          opacity: [0.2, 0.8, 0.3, 0.2],
          scale: [0.9, 1.3, 1, 0.9],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute right-[14%] top-[12%] w-2 h-2 bg-[#00a8e8] rounded-full shadow-[0_0_12px_#00a8e8] z-10 pointer-events-none"
      />
      
      {/* Partícula Flutuante 3 (Lado Direito - Baixo) */}
      <motion.div
        animate={{
          y: [0, 20, -15, 0],
          x: [0, -20, 10, 0],
          opacity: [0.2, 0.7, 0.3, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute right-[18%] top-[65%] w-1.5 h-1.5 bg-[#00a8e8] rounded-full shadow-[0_0_8px_#00a8e8] z-10 pointer-events-none"
      />
      
      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-16 border-b border-white/5">
        <div className="flex items-center text-[#00a8e8]">
          <Image
            src="/40AnosLogo2.svg"
            alt="Logo 40 Anos"
            width={48}
            height={48}
            className={`opacity-90 ${blueFilterClass}`}
          />
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm font-light text-gray-300">
          <div className="flex flex-col items-center gap-1">
            <Link href="#inicio" className="text-white">
              Início
            </Link>
            <div className="w-1 h-1 bg-[#00a8e8] rounded-full"></div>
          </div>
          <Link href="#programa" className="hover:text-white transition-colors">
            Programa
          </Link>
          <Link href="#empresas" className="hover:text-white transition-colors">
            Empresas
          </Link>
        </nav>

        {/* CTA Entrar Desktop */}
        <div className="hidden md:block text-xs font-semibold tracking-widest text-gray-300 hover:text-white transition-colors">
          <Link href="#entrar" className="flex items-center gap-2">
            ENTRAR <span className="text-[#00a8e8]">→</span>
          </Link>
        </div>

        {/* Menu Mobile */}
        <button className="md:hidden text-gray-300">
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

      {/* HERO SECTION REDIMENSIONADA */}
      <section
        id="inicio"
        className="relative z-10 px-6 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 max-w-[1600px] mx-auto border-b border-white/5"
      >
        {/* Esquerda - Texto */}
        <div className="flex-1 max-w-lg w-full">
          <div className="hidden md:block w-1.5 h-1.5 bg-[#00a8e8] rounded-full mb-8 shadow-[0_0_8px_#00a8e8]"></div>
          <h1
            className={`${spaceGrotesk.className} text-xl md:text-2xl lg:text-3xl font-medium leading-snug md:leading-normal mb-6 text-white`}
          >
            Três dias com toda a comunidade e as empresas que fazem parte desta
            história.
          </h1>
          <p
            className={`${dmMono.className} text-gray-400 text-[10px] md:text-xs tracking-[0.2em] mb-8 uppercase`}
          >
            1, 2 E 3 DE MARÇO DE 2026 • BRAGA
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#programa"
              className={`${dmMono.className} bg-[#00a8e8] hover:bg-[#0090c7] text-white px-6 py-3.5 text-xs md:text-sm font-semibold flex items-center justify-between gap-4 transition-all w-full sm:w-auto`}
            >
              Ver programa <span>→</span>
            </Link>
            <Link
              href="#entrar"
              className={`${dmMono.className} bg-[#040d14] border border-gray-800 hover:bg-gray-900/50 text-gray-300 px-6 py-3.5 text-xs md:text-sm font-semibold flex items-center justify-between gap-4 transition-all w-full sm:w-auto`}
            >
              Entrar no evento <span>→</span>
            </Link>
          </div>
        </div>

        {/* Direita - Logo 40 Anos Aumentado com Linha Divisória */}
        <div className="flex-1 flex items-center justify-start md:justify-end w-full">
          <div className="flex items-center gap-6 md:gap-8">
            <Image
              src="/40AnosLogo2.svg"
              alt="40 Logo"
              width={380}
              height={380}
              className={`w-52 md:w-80 lg:w-[360px] h-auto opacity-90 ${blueFilterClass}`}
            />
            <div className="flex flex-col gap-2 pl-6 md:pl-8 border-l-2 border-[#00a8e8]">
              <span className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] text-[#00a8e8]">
                ANOS
              </span>
              <span className="text-[10px] md:text-xs lg:text-sm font-mono tracking-[0.2em] text-gray-300 uppercase leading-relaxed">
                Licenciatura em
                <br />
                Ciências da
                <br />
                Computação
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HISTÓRIA SECTION */}
      <section
        id="historia"
        className="relative z-10 px-6 md:px-16 py-16 md:py-24 max-w-[1600px] mx-auto border-b border-white/5"
      >
        <h2
          className={`${spaceGrotesk.className} text-[#00a8e8] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 md:mb-12`}
        >
          História
        </h2>

        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className={`${manrope.className} text-gray-300 text-base md:text-xl leading-relaxed`}
          >
            Desde 1986, milhares de pessoas passaram pelas nossas salas,
            laboratórios e projetos. Cada geração acrescentou uma nova linha a
            esta história.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-800/50">
          <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800/50">
            <h3
              className={`${spaceGrotesk.className} text-4xl md:text-6xl text-[#00a8e8] font-light mb-2`}
            >
              1986
            </h3>
            <p
              className={`${manrope.className} text-gray-500 text-xs md:text-sm`}
            >
              O primeiro capítulo
            </p>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center gap-8 border-b md:border-b-0 md:border-r border-gray-800/50">
            <p
              className={`${manrope.className} text-gray-300 text-sm leading-relaxed pb-8 border-b border-gray-800/50`}
            >
              A Licenciatura nasce num momento em que a computação começava a
              redesenhar o mundo. Na Universidade do Minho, encontrou um lugar
              para crescer com rigor, curiosidade e ambição.
            </p>
            <p
              className={`${manrope.className} text-gray-300 text-sm leading-relaxed`}
            >
              Hoje, a mesma energia liga alumni, estudantes, docentes,
              investigadores e empresas numa comunidade aberta ao que ainda não
              foi inventado.
            </p>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center items-end text-right">
            <h3
              className={`${spaceGrotesk.className} text-4xl md:text-6xl text-[#00a8e8] font-light mb-2`}
            >
              2026
            </h3>
            <p
              className={`${manrope.className} text-gray-500 text-xs md:text-sm`}
            >
              O futuro continua
            </p>
          </div>
        </div>
      </section>

{/* PROGRAMA SECTION */}
      <section
        id="programa"
        className="relative z-10 px-6 md:px-16 py-16 md:py-24 max-w-[1600px] mx-auto border-b border-white/5"
      >
        {/* Cabeçalho: Título "PROGRAMA" à esquerda e botão "Programa completo" à direita */}
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <h2
            className={`${spaceGrotesk.className} text-[#00a8e8] text-xs md:text-sm font-bold tracking-[0.2em] uppercase`}
          >
            PROGRAMA
          </h2>
          <Link
            href="#programa-completo"
            className={`${dmMono.className} border border-gray-800/80 hover:border-gray-600 bg-transparent text-gray-300 hover:text-white px-5 py-2.5 text-xs md:text-sm flex items-center gap-3 transition-colors`}
          >
            Programa completo <span>→</span>
          </Link>
        </div>

        {/* Grelha de 3 colunas com linhas horizontais (topo/fundo) e divisórias verticais entre cartões */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-800/50">
          
          {/* Card 1: Stands */}
          <div className="p-8 md:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-gray-800/50 group">
            <h3
              className={`${spaceGrotesk.className} text-2xl md:text-3xl font-medium mb-6 text-white group-hover:text-[#00a8e8] transition-colors`}
            >
              Stands
            </h3>
            <p
              className={`${manrope.className} text-gray-400 text-xs md:text-sm leading-relaxed`}
            >
              Um espaço aberto ao longo do evento para conversar com os
              estudantes, dar a conhecer a organização e encontrar quem pode vir
              a fazer parte da equipa.
            </p>
          </div>

          {/* Card 2: Palestras */}
          <div className="p-8 md:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-gray-800/50 group">
            <h3
              className={`${spaceGrotesk.className} text-2xl md:text-3xl font-medium mb-6 text-white group-hover:text-[#00a8e8] transition-colors`}
            >
              Palestras
            </h3>
            <p
              className={`${manrope.className} text-gray-400 text-xs md:text-sm leading-relaxed`}
            >
              Uma sessão em auditório para apresentar o trabalho, a visão e os
              desafios da organização, perante uma plateia atenta e interessada.
            </p>
          </div>

          {/* Card 3: Workshops */}
          <div className="p-8 md:p-10 lg:p-12 group">
            <h3
              className={`${spaceGrotesk.className} text-2xl md:text-3xl font-medium mb-6 text-white group-hover:text-[#00a8e8] transition-colors`}
            >
              Workshops
            </h3>
            <p
              className={`${manrope.className} text-gray-400 text-xs md:text-sm leading-relaxed`}
            >
              Uma sessão prática, em grupos pequenos, para mostrar de perto as
              ferramentas, os métodos e as ideias do dia a dia.
            </p>
          </div>

        </div>
      </section>

      {/* PARCEIROS SECTION */}
      <section
        id="empresas"
        className="relative z-10 px-6 md:px-16 py-16 md:py-24 max-w-[1600px] mx-auto border-b border-white/5"
      >
        <h2
          className={`${spaceGrotesk.className} text-[#00a8e8] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-16 md:mb-20 text-left`}
        >
          Parceiros
        </h2>

        <div className="space-y-16 md:space-y-24 max-w-5xl mx-auto">
          {/* GOLD */}
          <div className="text-center">
            <h3
              className={`${spaceGrotesk.className} text-[#D4AF37] text-lg font-bold tracking-[0.3em] mb-10 md:mb-12 uppercase`}
            >
              Gold
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-end justify-items-center">
              <div className="flex flex-col items-center gap-3 group">
                <div className="h-12 md:h-16 flex items-center justify-center">
                  <Image
                    src="/assets/companies/bosch.svg"
                    alt="Bosch"
                    width={80}
                    height={80}
                    className={`max-h-12 md:max-h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Bosch
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-12 md:h-16 flex items-center justify-center">
                  <Image
                    src="/assets/companies/accenture.svg"
                    alt="Accenture"
                    width={100}
                    height={40}
                    className={`max-h-12 md:max-h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Accenture
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-12 md:h-16 flex items-center justify-center">
                  <Image
                    src="/assets/companies/googlecloud.svg"
                    alt="Google Cloud"
                    width={100}
                    height={40}
                    className={`max-h-12 md:max-h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Google Cloud
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-12 md:h-16 flex items-center justify-center">
                  <Image
                    src="/assets/companies/redhat.svg"
                    alt="Red Hat"
                    width={100}
                    height={40}
                    className={`max-h-12 md:max-h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Red Hat
                </span>
              </div>
            </div>
          </div>

          {/* SILVER */}
          <div className="text-center">
            <h3
              className={`${spaceGrotesk.className} text-[#A9A9A9] text-lg font-bold tracking-[0.3em] mb-10 md:mb-12 uppercase`}
            >
              Silver
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-end justify-items-center">
              <div className="flex flex-col items-center gap-3 group">
                <div className="h-10 md:h-12 flex items-center justify-center">
                  <Image
                    src="/assets/companies/nvidia.svg"
                    alt="Nvidia"
                    width={80}
                    height={30}
                    className={`max-h-10 md:max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Nvidia
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-10 md:h-12 flex items-center justify-center">
                  <Image
                    src="/assets/companies/intel.svg"
                    alt="Intel"
                    width={70}
                    height={30}
                    className={`max-h-10 md:max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Intel
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-10 md:h-12 flex items-center justify-center">
                  <Image
                    src="/assets/companies/github.svg"
                    alt="Github"
                    width={70}
                    height={30}
                    className={`max-h-10 md:max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Github
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-10 md:h-12 flex items-center justify-center">
                  <Image
                    src="/assets/companies/cloudflare.svg"
                    alt="Cloudflare"
                    width={90}
                    height={30}
                    className={`max-h-10 md:max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Cloudflare
                </span>
              </div>
            </div>
          </div>

          {/* BRONZE */}
          <div className="text-center">
            <h3
              className={`${spaceGrotesk.className} text-[#CD7F32] text-lg font-bold tracking-[0.3em] mb-10 md:mb-12 uppercase`}
            >
              Bronze
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-end justify-items-center">
              <div className="flex flex-col items-center gap-3 group">
                <div className="h-8 md:h-10 flex items-center justify-center">
                  <Image
                    src="/assets/companies/cisco.svg"
                    alt="Cisco"
                    width={60}
                    height={25}
                    className={`max-h-8 md:max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Cisco
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-8 md:h-10 flex items-center justify-center">
                  <Image
                    src="/assets/companies/sap.svg"
                    alt="SAP"
                    width={60}
                    height={25}
                    className={`max-h-8 md:max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  SAP
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-8 md:h-10 flex items-center justify-center">
                  <Image
                    src="/assets/companies/stripe.svg"
                    alt="Stripe"
                    width={50}
                    height={25}
                    className={`max-h-8 md:max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Stripe
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <div className="h-8 md:h-10 flex items-center justify-center">
                  <Image
                    src="/assets/companies/uphold.svg"
                    alt="Uphold"
                    width={50}
                    height={25}
                    className={`max-h-8 md:max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity ${blueFilterClass}`}
                  />
                </div>
                <span
                  className={`${dmMono.className} text-[10px] tracking-widest text-gray-400 uppercase`}
                >
                  Uphold
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 px-6 md:px-16 py-24 md:py-32 flex flex-col items-start md:items-center text-left md:text-center border-b border-white/5 max-w-[1600px] mx-auto">
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#00a8e8] rounded-full blur-[150px] opacity-10 z-0 pointer-events-none"></div>
        <p
          className={`${dmMono.className} text-[#00a8e8] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6`}
        >
          O próximo capítulo começa agora
        </p>
        <h2
          className={`${manrope.className} text-4xl md:text-6xl font-medium tracking-tight mb-10 md:mb-12`}
        >
          40 anos de história.
          <br className="hidden md:block" /> Uma visão para o futuro.
        </h2>
        <Link
          href="#entrar"
          className={`${dmMono.className} bg-[#00a8e8] hover:bg-[#0090c7] text-white px-8 py-4 md:py-5 text-sm font-semibold flex items-center justify-center gap-6 transition-all w-full md:w-auto`}
        >
          Participar no evento <span>→</span>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-8 py-4 md:py-5 border-t border-white/5 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          {/* Logo Esquerda */}
          <div className="flex items-center">
            <Image
              src="/40AnosLogo2.svg"
              alt="40 Anos"
              width={56}
              height={56}
              className={`w-10 md:w-14 h-auto opacity-90 ${blueFilterClass}`}
            />
          </div>

          {/* Links e Redes Sociais Direita */}
          <div
            className={`flex flex-col items-start md:items-end gap-2 text-xs md:text-sm text-gray-300 ${manrope.className}`}
          >
            {/* Linha 1 de Links */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link href="#" className="hover:text-white transition-colors">
                Informação geral
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Reportar um problema
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Regulamento
              </Link>
            </div>

            {/* Linha 2 de Links */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <Link href="#" className="hover:text-white transition-colors">
                Guia do participante
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Política de privacidade
              </Link>
            </div>

            {/* Ícones Sociais */}
            <div className="flex items-center gap-4 text-gray-400 pt-0.5">
              <Link
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>

              <Link
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Github"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>

              <Link
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}