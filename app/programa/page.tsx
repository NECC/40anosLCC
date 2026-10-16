"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

type Category =
  | "Todos"
  | "Palestras"
  | "Workshops"
  | "Mesas-redondas"
  | "Networking";

interface ScheduleItem {
  id: string;
  day: "14 Novembro" | "15 Novembro";
  dayOfWeek: "Sexta-feira" | "Sábado";
  startTime: string;
  endTime: string;
  category: "Palestras" | "Workshops" | "Mesas-redondas" | "Networking";
  title: string;
  speakers: string;
  location: string;
}

const scheduleData: ScheduleItem[] = [
  // 14 NOVEMBRO
  {
    id: "1",
    day: "14 Novembro",
    dayOfWeek: "Sexta-feira",
    startTime: "09:00",
    endTime: "09:30",
    category: "Networking",
    title: "Receção e acreditação",
    speakers: "Equipa LCC | Universidade do Minho",
    location: "Átrio do DI",
  },
  {
    id: "2",
    day: "14 Novembro",
    dayOfWeek: "Sexta-feira",
    startTime: "09:30",
    endTime: "10:30",
    category: "Palestras",
    title: "Quatro décadas a imaginar o futuro",
    speakers: "Prof.ª Maria João Frade | Universidade do Minho",
    location: "Auditório A1",
  },
  {
    id: "3",
    day: "14 Novembro",
    dayOfWeek: "Sexta-feira",
    startTime: "11:00",
    endTime: "12:00",
    category: "Palestras",
    title: "Computação que transforma o mundo",
    speakers: "Miguel Martins | Critical TechWorks",
    location: "Auditório A1",
  },
  {
    id: "4",
    day: "14 Novembro",
    dayOfWeek: "Sexta-feira",
    startTime: "14:30",
    endTime: "16:00",
    category: "Mesas-redondas",
    title: "Das primeiras linhas de código à IA",
    speakers: "Painel de alumni | Bosch · Cegid · INL",
    location: "Sala 1.05",
  },

  // 15 NOVEMBRO
  {
    id: "5",
    day: "15 Novembro",
    dayOfWeek: "Sábado",
    startTime: "10:00",
    endTime: "12:00",
    category: "Workshops",
    title: "Arquiteturas cloud à escala",
    speakers: "Ana Ribeiro | OutSystems",
    location: "Lab 2.01",
  },
  {
    id: "6",
    day: "15 Novembro",
    dayOfWeek: "Sábado",
    startTime: "10:00",
    endTime: "12:00",
    category: "Workshops",
    title: "Sistemas inteligentes responsáveis",
    speakers: "Rui Costa | Feedzai",
    location: "Lab 2.05",
  },
  {
    id: "7",
    day: "15 Novembro",
    dayOfWeek: "Sábado",
    startTime: "12:30",
    endTime: "14:00",
    category: "Networking",
    title: "Almoço da comunidade",
    speakers: "Comunidade LCC | Empresas parceiras",
    location: "Jardim do DI",
  },
  {
    id: "8",
    day: "15 Novembro",
    dayOfWeek: "Sábado",
    startTime: "15:00",
    endTime: "16:00",
    category: "Palestras",
    title: "A próxima década começa hoje",
    speakers: "Direção de Curso | Universidade do Minho",
    location: "Auditório A1",
  },
];

const categories: Category[] = [
  "Todos",
  "Palestras",
  "Workshops",
  "Mesas-redondas",
  "Networking",
];

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const staggerItem: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Programa() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filteredSchedule = scheduleData.filter((item) =>
    activeCategory === "Todos" ? true : item.category === activeCategory,
  );

  const day1Items = filteredSchedule.filter(
    (item) => item.day === "14 Novembro",
  );
  const day2Items = filteredSchedule.filter(
    (item) => item.day === "15 Novembro",
  );

  return (
    <main className="bg-[#06151D] min-h-screen text-white relative selection:bg-[#00a8e8] selection:text-white">
      {/* Navegação */}
      <div className="mx-auto w-full max-w-400 px-4 sm:px-10 lg:px-16">
        <Nav />
      </div>

      <section className="relative z-10 overflow-hidden py-20 md:py-32 border-b border-gray-800/40">
        <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />

        {/* Pontos Azuis (Efeito Estrelar Solto) */}
        <span className="absolute top-[30%] left-[8%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[12%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1.5s]" />

        {/* Linha Laser/Scan Animada */}
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        {/* Animação do Texto do Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 relative z-10"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#00a8e8] uppercase mb-6 flex items-center gap-3">
            <span>14-15 Novembro</span>
            <span className="w-1 h-1 bg-[#00a8e8] rounded-full"></span>
            <span>Braga</span>
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight mb-8">
            Programa
          </h1>

          <p className="font-sans text-gray-400 text-sm md:text-lg max-w-2xl leading-relaxed">
            Dois dias para revisar a nossa história, partilhar conhecimento e
            imaginar o que vem a seguir.
          </p>
        </motion.div>
      </section>

      {/* Conteúdo Principal / Mensagem Temporária */}
      <section className="mx-auto w-full max-w-400 px-6 sm:px-10 lg:px-16 py-12 md:py-24 relative z-10">
        
        {/* Mensagem "To be announced" */}
        <motion.div
          className="flex flex-col items-center justify-center text-center py-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-10%" }}
        >
          <div className="w-20 h-20 rounded-full bg-[#00a8e8]/10 border border-[#00a8e8]/30 flex items-center justify-center mb-8">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00a8e8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-white mb-4">
            To be announced
          </h2>
          <p className="font-sans text-gray-400 text-sm max-w-md">
            Estamos a preparar um programa incrível para celebrar os 40 anos da LCC. Fica atento às novidades e aos horários oficiais.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* CONTEÚDO ORIGINAL DO PROGRAMA (COMENTADO PARA USO FUTURO) */}
        {/* ========================================================= */}
        {/*
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 border-b border-gray-800/50 pb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-4 py-2 border transition-all ${
                  isActive
                    ? "bg-[#00a8e8] text-white border-[#00a8e8] font-semibold"
                    : "bg-[#040d14] text-gray-400 border-gray-800/80 hover:border-gray-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          className="space-y-16 md:space-y-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-10%" }}
        >
          {day1Items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-3">
                <h2 className="font-heading text-xl font-medium text-white mb-1">
                  14 Novembro
                </h2>
                <p className="font-sans text-xs text-gray-500">Sexta-feira</p>
              </div>

              <div className="lg:col-span-9 divide-y divide-gray-800/50 border-t border-b border-gray-800/50">
                {day1Items.map((item) => (
                  <motion.div key={item.id} variants={staggerItem}>
                    <ScheduleRow item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {day2Items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-3">
                <h2 className="font-heading text-xl font-medium text-white mb-1">
                  15 Novembro
                </h2>
                <p className="font-sans text-xs text-gray-500">Sábado</p>
              </div>

              <div className="lg:col-span-9 divide-y divide-gray-800/50 border-t border-b border-gray-800/50">
                {day2Items.map((item) => (
                  <motion.div key={item.id} variants={staggerItem}>
                    <ScheduleRow item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {day1Items.length === 0 && day2Items.length === 0 && (
            <div className="text-center py-16 text-gray-500 font-mono text-sm">
              Nenhuma sessão encontrada para a categoria "{activeCategory}".
            </div>
          )}
        </motion.div>
        */}
      </section>

      {/* Footer */}
      <div className="mx-auto w-full max-w-400 px-6 sm:px-10 lg:px-16 pt-12 md:pt-20">
        <Footer />
      </div>
    </main>
  );
}

{/* Componente para a linha individual do programa */}
function ScheduleRow({ item }: { item: ScheduleItem }) {
  return (
    <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/[0.01] transition-colors px-2">
      <div className="flex items-start md:items-center gap-6 md:gap-10">
        {/* Hora */}
        <div className="font-mono text-[#00a8e8] text-sm shrink-0 min-w-[60px]">
          <div className="font-medium">{item.startTime}</div>
          <div className="text-xs text-gray-500">{item.endTime}</div>
        </div>

        {/* Detalhes da Sessão */}
        <div>
          <span className="font-mono text-[10px] tracking-widest text-[#00a8e8] uppercase block mb-1.5">
            {item.category}
          </span>
          <h3 className="font-heading text-base md:text-lg font-medium text-white mb-1 group-hover:text-[#00a8e8] transition-colors">
            {item.title}
          </h3>
          <p className="font-sans text-xs text-gray-400">{item.speakers}</p>
        </div>
      </div>

      {/* Localização */}
      <div className="font-sans text-xs text-gray-500 md:text-right shrink-0 mt-2 md:mt-0">
        {item.location}
      </div>
    </div>
  );
}