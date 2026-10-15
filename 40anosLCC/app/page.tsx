"use client";

import Image from "next/image";
import Link from "next/link";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { partnersData } from "@/data/parteners";

export default function Home() {
  return (
    <main className="bg-[#06151D]">
      <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16">
        <Nav />
      </div>

      <section className="overflow-hidden lg:h-[70vh] md:h-[50vh] relative z-10">
        {/* grid e elementos de animação */}
        <div className="bg-grid absolute inset-0" />
        <div className="absolute top-[55%] left-0 size-72 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] md:size-96" />
        <div className="absolute top-0 right-0 size-80 translate-x-1/3 -translate-y-1/3 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] [animation-delay:3s] md:size-112" />

        <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16 relative z-10 flex justify-center items-center h-full">
          <div className="flex flex-col items-center justify-between gap-12 py-20 md:flex-row md:gap-16 md:py-28 ">
            <div className="w-full md:w-1/2 relative z-10">
              <h1 className="font-heading mb-6 text-xl leading-snug font-medium text-white md:text-2xl md:leading-normal lg:text-3xl">
                Três dias com toda a comunidade e as empresas que fazem parte
                desta história.
              </h1>

              <p className="mb-8 text-[10px] tracking-[0.2em] text-gray-400 uppercase md:text-xs">
                1, 2 E 3 DE MARÇO DE 2026 • BRAGA
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#programa"
                  className="flex w-full items-center justify-between gap-4 bg-[#00a8e8] px-6 py-3.5 text-xs font-semibold text-white transition-all hover:bg-[#0090c7] sm:w-auto md:text-sm"
                >
                  Ver programa <span>→</span>
                </Link>

                <Link
                  href="#entrar"
                  className="flex w-full items-center justify-between gap-4 border border-gray-800 bg-[#040d14] px-6 py-3.5 text-xs font-semibold text-gray-300 transition-all hover:bg-gray-900/50 sm:w-auto md:text-sm"
                >
                  Entrar no evento <span>→</span>
                </Link>
              </div>
            </div>

            <Image
              src="/40+.svg"
              alt="40+ Logo"
              width={200}
              height={100}
              className="hidden h-auto md:block md:w-3/8 relative z-10"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16">
        <h2 className="font-heading mb-8 text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-12">
          História
        </h2>

        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="font-sans text-base leading-relaxed text-gray-300 md:text-xl">
            Desde 1986, milhares de pessoas passaram pelas nossas salas,
            laboratórios e projetos. Cada geração acrescentou uma nova linha a
            esta história.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-b border-gray-800/50 md:grid-cols-3">
          <div className="flex flex-col justify-center border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-12">
            <h3 className="font-heading mb-2 text-4xl font-light text-[#00a8e8] md:text-6xl">
              1986
            </h3>

            <p className="font-sans text-xs text-gray-500 md:text-sm">
              O primeiro capítulo
            </p>
          </div>

          <div className="flex flex-col justify-center gap-8 border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-12">
            <p className="font-sans border-b border-gray-800/50 pb-8 text-sm leading-relaxed text-gray-300">
              A Licenciatura nasce num momento em que a computação começava a
              redesenhar o mundo. Na Universidade do Minho, encontrou um lugar
              para crescer com rigor, curiosidade e ambição.
            </p>

            <p className="font-sans text-sm leading-relaxed text-gray-300">
              Hoje, a mesma energia liga alumni, estudantes, docentes,
              investigadores e empresas numa comunidade aberta ao que ainda não
              foi inventado.
            </p>
          </div>

          <div className="flex flex-col items-end justify-center p-8 text-right md:p-12">
            <h3 className="font-heading mb-2 text-4xl font-light text-[#00a8e8] md:text-6xl">
              2026
            </h3>

            <p className="font-sans text-xs text-gray-500 md:text-sm">
              O futuro continua
            </p>
          </div>
        </div>
      </section>

      <section className=" py-16 md:py-24 mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16">
        <div className="mb-10 flex items-center justify-between md:mb-16">
          <h2 className="font-heading text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
            PROGRAMA
          </h2>

          <Link
            href="#programa-completo"
            className="font-mono flex items-center gap-3 border border-gray-800/80 bg-transparent px-5 py-2.5 text-xs text-gray-300 transition-colors hover:border-gray-600 hover:text-white md:text-sm"
          >
            Programa completo <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 border-t border-b border-gray-800/50 md:grid-cols-3">
          <div className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10 lg:p-12">
            <h3 className="font-heading mb-6 text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Stands
            </h3>

            <p className="font-sans text-xs leading-relaxed text-gray-400 md:text-sm">
              Um espaço aberto ao longo do evento para conversar com os
              estudantes, dar a conhecer a organização e encontrar quem pode vir
              a fazer parte da equipa.
            </p>
          </div>

          <div className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10 lg:p-12">
            <h3 className="font-heading mb-6 text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Palestras
            </h3>

            <p className="font-sans text-xs leading-relaxed text-gray-400 md:text-sm">
              Uma sessão em auditório para apresentar o trabalho, a visão e os
              desafios da organização, perante uma plateia atenta e interessada.
            </p>
          </div>

          <div className="group p-8 md:p-10 lg:p-12">
            <h3 className="font-heading mb-6 text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Workshops
            </h3>

            <p className="font-sans text-xs leading-relaxed text-gray-400 md:text-sm">
              Uma sessão prática, em grupos pequenos, para mostrar de perto as
              ferramentas, os métodos e as ideias do dia a dia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16">
        <h2 className="font-heading mb-16 text-left text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-20">
          Parceiros
        </h2>

        <div className="mx-auto max-w-5xl space-y-16 md:space-y-24">
          {(["Gold", "Silver", "Bronze"] as const).map((tier) => {
            const partners = partnersData.filter(
              (partner) => partner.tier === tier,
            );

            if (partners.length === 0) return null;

            const tierColors = {
              Gold: "#D4AF37",
              Silver: "#A9A9A9",
              Bronze: "#CD7F32",
            };

            return (
              <div key={tier} className="text-center">
                <h3
                  className="font-heading mb-10 text-lg font-bold tracking-[0.3em] uppercase md:mb-12"
                  style={{ color: tierColors[tier] }}
                >
                  {tier}
                </h3>

                <div className="flex flex-wrap items-end justify-center gap-10 md:gap-16">
                  {partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="group flex flex-col items-center gap-3"
                    >
                      <div className="flex h-12 items-center justify-center md:h-20">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={100}
                          height={100}
                          className="max-h-12 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100 md:max-h-32"
                        />
                      </div>

                      <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="relative py-16 text-white md:py-24 border-y-3 border-gray-800/50">
        {/* grid e elementos de animação */}
        <div className="bg-grid absolute inset-0" />
        <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="font-mono mb-4 text-[10px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-6 md:text-xs">
            O próximo capítulo começa agora
          </p>
          <h2 className="font-sans mb-10 text-4xl font-medium tracking-tight md:mb-12 md:text-6xl">
            40 anos de história.
            <br className="hidden md:block" /> Uma visão para o futuro.
          </h2>
          <Link
            href="#entrar"
            className="font-mono flex w-full items-center justify-center gap-6 bg-[#00a8e8] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0090c7] md:w-auto md:py-5"
          >
            Participar no evento <span>→</span>
          </Link>
        </div>
      </section>
      <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16 pt-16 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}
