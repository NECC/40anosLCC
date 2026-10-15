"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

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

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-16 md:py-24 border-b border-gray-800/40">
        {/* Background Grid com Máscara e Gradiente de Fusão */}
        {/* grid com máscara de desvanecimento no fundo */}
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]" />
        {/* Gradiente extra na base da secção para fusão perfeita com o fundo */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />
        {/* Partículas a Piscar */}
        <span className="absolute top-[30%] left-[8%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[12%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1.5s]" />

        {/* Linha Laser/Scan Animada (de cima para baixo) */}
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <div className="mx-auto w-full max-w-400 px-6 sm:px-10 lg:px-16 relative z-10">
          <p className="font-mono text-xs tracking-[0.2em] text-[#00a8e8] uppercase mb-4">
            14-15 NOVEMBRO • BRAGA
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6">
            Programa
          </h1>

          <p className="font-sans text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Dois dias para revisar a nossa história, partilhar conhecimento e
            imaginar o que vem a seguir.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal / Filtros e Lista */}
      <section className="mx-auto w-full max-w-400 px-6 sm:px-10 lg:px-16 py-12 md:py-16">
        {/* Filtros de Categoria */}
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

        {/* Lista de Eventos */}
        <div className="space-y-16 md:space-y-20">
          {/* DIA 1: 14 Novembro */}
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
                  <ScheduleRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* DIA 2: 15 Novembro */}
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
                  <ScheduleRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Mensagem caso não haja resultados */}
          {day1Items.length === 0 && day2Items.length === 0 && (
            <div className="text-center py-16 text-gray-500 font-mono text-sm">
              Nenhuma sessão encontrada para a categoria "{activeCategory}".
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="mx-auto w-full max-w-400 px-6 sm:px-10 lg:px-16 pt-12 md:pt-20">
        <Footer />
      </div>
    </main>
  );
}

{
  /* Componente para a linha individual do programa */
}
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
