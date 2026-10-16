"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

// Animações Padrão do Site
const slideLeft: any = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, margin: "-25%" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const zoomIn: any = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: false, margin: "-25%" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const blurReveal: any = {
  initial: { opacity: 0, y: 50, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: false, margin: "-25%" },
  transition: { duration: 0.6, ease: "easeOut" },
};

// Animações para a grelha em Cascata (Stagger)
const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }, // Efeito Escada
};

const staggerItem: any = {
  hidden: { opacity: 0, y: -50 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// Tipagem para a Empresa
type Empresa = {
  id: string;
  month: string;
  name: string;
  description: string;
  logo: string;
  totalDays: number;
  eventDays: number[];
  instagramLink?: string; // Link para onde redirecionar (opcional)
};

const empresasData: Empresa[] = [
  {
    id: "01",
    month: "JANEIRO",
    name: "Bosch",
    description: "Engenharia para um mundo conectado.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [12, 13, 25],
    instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "02",
    month: "FEVEREIRO",
    name: "Accenture",
    description: "Inovação com impacto real.",
    logo: "/images/partners/bosch.svg",
    totalDays: 28,
    eventDays: [8, 14],
    instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "03",
    month: "MARÇO",
    name: "NVIDIA",
    description: "Computação que transforma indústrias.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [3, 4, 20],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "04",
    month: "ABRIL",
    name: "Intel",
    description: "Tecnologia no centro do progresso.",
    logo: "/images/partners/bosch.svg",
    totalDays: 30,
    eventDays: [10, 11, 12],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "05",
    month: "MAIO",
    name: "Cisco",
    description: "Ligar pessoas, sistemas e possibilidades.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [5, 19],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "06",
    month: "JUNHO",
    name: "SAP",
    description: "Tecnologia que potencia negócios.",
    logo: "/images/partners/bosch.svg",
    totalDays: 30,
    eventDays: [15, 16],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "07",
    month: "JULHO",
    name: "Google Cloud",
    description: "Infraestrutura para ideias à escala global.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [8, 9, 22],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "08",
    month: "AGOSTO",
    name: "Red Hat",
    description: "Inovação aberta, construída em comunidade.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [12, 28],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "09",
    month: "SETEMBRO",
    name: "GitHub",
    description: "Onde o mundo constrói software.",
    logo: "/images/partners/bosch.svg",
    totalDays: 30,
    eventDays: [2, 3, 4],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "10",
    month: "OUTUBRO",
    name: "Cloudflare",
    description: "Uma internet mais rápida e segura.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [18, 19],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "11",
    month: "NOVEMBRO",
    name: "Stripe",
    description: "Infraestrutura para a economia digital.",
    logo: "/images/partners/bosch.svg",
    totalDays: 30,
    eventDays: [10, 24, 25],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
  {
    id: "12",
    month: "DEZEMBRO",
    name: "Uphold",
    description: "O futuro das finanças digitais.",
    logo: "/images/partners/bosch.svg",
    totalDays: 31,
    eventDays: [5, 6, 12],
        instagramLink: "https://www.instagram.com/necc.uminho/",
  },
];

export default function Empresas() {
  const [selectedCompany, setSelectedCompany] = useState<Empresa | null>(null);
  
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const closeModal = () => {
    setSelectedCompany(null);
    setSelectedDay(null); // Limpa também o dia selecionado
  };

  const closeDayPopup = () => setSelectedDay(null);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <main className="bg-[#06151D] min-h-screen text-white relative selection:bg-[#00a8e8] selection:text-white">
      {/* Navegação Global */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-16">
        <Nav />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 overflow-hidden py-20 md:py-32 border-b border-gray-800/40">
        <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />

        <span className="absolute top-[30%] left-[8%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[12%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1.5s]" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 relative z-10"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#00a8e8] uppercase mb-6 flex items-center gap-3">
            <span>12 MESES</span>
            <span className="w-1 h-1 bg-[#00a8e8] rounded-full"></span>
            <span>12 LIGAÇÕES</span>
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight mb-8">
            Empresas
          </h1>

          <p className="font-sans text-gray-400 text-sm md:text-lg max-w-2xl leading-relaxed">
            Um ano de celebração com organizações que cresceram connosco e continuam a
            aproximar academia e indústria.
          </p>
        </motion.div>
      </section>

      {/* GRELHA DE EMPRESAS */}
      <section className="w-full relative z-10 px-6 sm:px-10 lg:px-16 pb-20 md:pb-32 mt-[-1px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          className="mx-auto w-full max-w-[1400px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-800/40">
            {empresasData.map((empresa) => (
              <motion.div
                key={empresa.id}
                variants={staggerItem}
                onClick={() => setSelectedCompany(empresa)}
                className="group border-r border-b border-gray-800/40 p-8 md:p-10 hover:bg-white/[0.02] cursor-pointer transition-colors relative flex flex-col justify-between h-[360px] lg:h-[420px]"
              >
                {/* Header do Cartão */}
                <div className="flex justify-between items-center w-full font-mono text-[10px] tracking-widest text-[#00a8e8]">
                  <span>{empresa.id}</span>
                  <span className="uppercase text-gray-500 tracking-[0.2em] group-hover:text-gray-300 transition-colors">{empresa.month}</span>
                </div>

                {/* Logo da Empresa */}
                <div className="flex items-center h-24 mt-auto mb-10 relative">
                  {empresa.logo ? (
                    <Image
                      src={empresa.logo}
                      alt={empresa.name}
                      width={100}
                      height={50}
                      className="object-contain max-h-14 w-auto brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-800/50 rounded flex items-center justify-center text-gray-600 text-xs">Logo</div>
                  )}
                  {/* Ícone indicativo de clique */}
                  <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#00a8e8] font-mono text-xs hidden md:block">
                    Ver datas →
                  </span>
                </div>

                {/* Texto */}
                <div className="mt-auto">
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-[#00a8e8] transition-colors">
                    {empresa.name}
                  </h3>
                  <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed max-w-[260px]">
                    {empresa.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OVERLAY DO CALENDÁRIO (1º MODAL) */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#06151D]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-md bg-[#0a1b24] border border-gray-800/60 p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a8e8] rounded-full blur-[100px] opacity-10 pointer-events-none" />

              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="mb-8">
                <p className="font-mono text-[#00a8e8] text-xs tracking-[0.2em] uppercase mb-2">
                  Atividades em {selectedCompany.month}
                </p>
                <h3 className="font-heading text-3xl font-medium text-white flex items-center gap-4">
                  {selectedCompany.name}
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4 text-center font-mono text-xs text-gray-500">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>

              {/* Grelha de Dias */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: selectedCompany.totalDays }, (_, i) => i + 1).map((day) => {
                  const isEventDay = selectedCompany.eventDays.includes(day);

                  return (
                    <div
                      key={day}
                      onClick={() => isEventDay && handleDayClick(day)} // Apenas clica se for um dia de evento
                      className={`
                        aspect-square flex items-center justify-center font-sans text-sm rounded-sm transition-all
                        ${isEventDay 
                          ? "bg-[#00a8e8]/20 text-[#00a8e8] border border-[#00a8e8]/50 font-bold shadow-[0_0_10px_rgba(0,168,232,0.3)] cursor-pointer hover:bg-[#00a8e8]/40 hover:scale-110" 
                          : "text-gray-400 border border-transparent hover:border-gray-700/50 hover:bg-white/[0.02]"
                        }
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Rodapé do Modal com Legenda e Dica */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#00a8e8]/20 border border-[#00a8e8]/50 rounded-sm"></div>
                  <span className="font-sans text-xs text-gray-400">Presença no campus</span>
                </div>
                <span className="font-mono text-[9px] text-gray-500 tracking-wider">
                  Clica no dia para ver atividade
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OVERLAY DE REDIRECIONAMENTO (2º MODAL) */}
      <AnimatePresence>
        {selectedDay && selectedCompany && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDayPopup}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative z-10 w-full max-w-sm bg-[#06151D] border border-[#00a8e8]/30 p-6 shadow-[0_0_30px_rgba(0,168,232,0.15)] rounded-md text-center"
            >
              <div className="w-12 h-12 bg-[#00a8e8]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#00a8e8]/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a8e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              
              <h4 className="font-heading text-xl text-white mb-2">
                Atividade a {selectedDay} de {selectedCompany.month.toLowerCase()}
              </h4>
              <p className="font-sans text-sm text-gray-400 mb-6">
                Serás redirecionado para o Instagram onde encontrarás todas as informações sobre esta atividade da {selectedCompany.name}.
              </p>

              <div className="flex gap-3 w-full">
                <button 
                  onClick={closeDayPopup}
                  className="flex-1 font-mono text-xs py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  VOLTAR
                </button>
                <a 
                  href={selectedCompany.instagramLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeDayPopup}
                  className="flex-1 font-mono text-xs py-3 bg-[#00a8e8] text-white hover:bg-[#0090c7] transition-colors flex items-center justify-center"
                >
                  ABRIR LINK
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 pt-20 md:pt-32">
        <Footer />
      </div>
    </main>
  );
}