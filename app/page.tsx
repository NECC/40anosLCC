"use client";

import Image from "next/image";
import Link from "next/link";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { partnersData } from "@/data/parteners";
// CARLOS FRAMER-MOTION NOT EMOTION, SEU NOOB
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";

// Animações 
const slideLeft: any = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-25%" }, // <- margin: "-25%" faz começar mais tarde
  transition: { duration: 0.5, ease: "easeOut" }, // <- duration: 0.5 faz ser mais rápida, para saberes carlitos
};

const zoomIn: any = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-25%" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const blurReveal: any = {
  initial: { opacity: 0, y: 50, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-25%" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const staggerItem: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Home() {
  return (
    <main className="bg-[#06151D]">
      <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16">
        <Nav />
      </div>

      <section className="overflow-hidden lg:h-[70vh] md:h-[50vh] relative z-10">
        {/* grid com máscara de desvanecimento no fundo */}
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]" />
        {/* Gradiente extra na base da secção para fusão perfeita com o fundo */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />
        <div className="absolute top-[55%] left-0 size-72 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] md:size-96" />
        <div className="absolute top-0 right-0 size-80 translate-x-1/3 -translate-y-1/3 animate-glow rounded-full bg-[#00a8e8]/25 blur-[100px] [animation-delay:3s] md:size-112" />

        <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />
        {/*AQUI CARLOS*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16 relative z-10 flex justify-center items-center h-full">
          <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16 relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col items-center justify-between gap-12 py-20 md:flex-row md:gap-16 md:py-28 ">
              <div className="w-full md:w-1/2 relative z-10">
                <h1 className="font-heading mb-6 text-xl leading-snug font-medium text-white md:text-2xl md:leading-normal lg:text-3xl">
                  Three days with the entire community and the companies that are part of this story.
                </h1>

                <p className="mb-8 text-[10px] tracking-[0.2em] text-gray-400 uppercase md:text-xs">
                  MARCH 1, 2 AND 3, 2026 • BRAGA
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/*<Link
                    href="/programa"
                    className="flex w-full items-center justify-between gap-4 bg-[#00a8e8] px-6 py-3.5 text-xs font-semibold text-white transition-all hover:bg-[#0090c7] sm:w-auto md:text-sm"
                  >
                    View Schedule <span>→</span>
                  </Link>
                  {/*
                  <Link
                    href="#entrar"
                    className="flex w-full items-center justify-between gap-4 border border-gray-800 bg-[#040d14] px-6 py-3.5 text-xs font-semibold text-gray-300 transition-all hover:bg-gray-900/50 sm:w-auto md:text-sm"
                  >
                    Join the event <span>→</span>
                  </Link>*/}
                  <div className="flex rounded-lg w-full items-center justify-between gap-4 bg-[#00a8e8] px-6 py-3.5 text-xs font-semibold text-white transition-all hover:bg-[#0090c7] sm:w-auto md:text-sm">
                    View Schedule <span><FaArrowCircleRight /></span>
                  </div>
                  <div className="flex rounded-lg w-full items-center justify-between gap-4 border border-gray-800 bg-[#040d14] px-6 py-3.5 text-xs font-semibold text-gray-300 transition-all hover:bg-gray-900/50 sm:w-auto md:text-sm">
                    Join Event <span><FaArrowCircleRight /></span>
                  </div>
                </div>
              </div>

              <Image
                src="/logocomtexto4oLCC.svg"
                alt="40+ Logo"
                width={200}
                height={300}
                className="hidden h-auto lg:block lg:w-160 relative z-10"
              />
            </div>
          </div>
        </motion.div>
        {/*O primeiro acaba aqui */}
      </section>

      {/*AQUI O PROXIMO */}
      <motion.section 
        {...slideLeft}
        className="py-16 md:py-24 mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16"
      >
        <h2 className="font-heading mb-8 text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-12">
          History
        </h2>

        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="font-sans text-base leading-relaxed text-gray-300 md:text-xl">
            Since 1986, thousands of people have passed through our classrooms,
            labs, and projects. Every generation has added a new line to this story.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-b border-gray-800/50 md:grid-cols-3">
          <div className="flex flex-col justify-center border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-12">
            <h3 className="font-heading mb-2 text-4xl font-light text-[#00a8e8] md:text-6xl">
              1986
            </h3>

            <p className="font-sans text-xs text-gray-500 md:text-sm">
              The first chapter
            </p>
          </div>

          <div className="flex flex-col justify-center gap-8 border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-12">
            <p className="font-sans border-b border-gray-800/50 pb-8 text-sm leading-relaxed text-gray-300">
              The degree was born at a time when computing was beginning to
              reshape the world. At the University of Minho, it found a place to
              grow with rigor, curiosity, and ambition.
            </p>

            <p className="font-sans text-sm leading-relaxed text-gray-300">
              Today, the same energy connects alumni, students, faculty,
              researchers, and companies in a community open to what has yet to
              be invented.
            </p>
          </div>

          <div className="flex flex-col items-end justify-center p-8 text-right md:p-12">
            <h3 className="font-heading mb-2 text-4xl font-light text-[#00a8e8] md:text-6xl">
              2026
            </h3>

            <p className="font-sans text-xs text-gray-500 md:text-sm">
              The future continues
            </p>
          </div>
        </div>
      </motion.section>

      {/*ACHO QUE A ESTE PONTO JA PECEBESTE COMO FUNCIONA */}
      <section className=" py-16 md:py-24 mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16">
        {/*O "Programa" e o "Programa completo tambem precisa de animação" */}
        <motion.div 
          {...slideLeft}
          className="mb-10 flex items-center justify-between md:mb-16"
        >
          <h2 className="font-heading text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
            PROGRAM
          </h2>
{/*
          <Link
            href="/programa"
            className="font-mono rounded-lg flex items-center gap-3 border border-gray-800/80 bg-transparent px-5 py-2.5 text-xs text-gray-300 transition-colors hover:border-gray-600 hover:text-white md:text-sm"
          >
            Full schedule <span><FaArrowCircleRight /></span>
          </Link>
*/}
          <div className="font-mono rounded-lg flex items-center gap-3 border border-gray-800/80 bg-transparent px-5 py-2.5 text-xs text-gray-300 transition-colors hover:border-gray-600 hover:text-white md:text-sm">
            Full schedule <span><FaArrowCircleRight /></span>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-25%" }}
          className="grid grid-cols-1 border-t border-b border-gray-800/50 md:grid-cols-3"
        >
          <motion.div variants={staggerItem} className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10 lg:p-12">
            <h3 className="font-heading mb-6 text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Stands
            </h3>

            <p className="font-sans text-xs leading-relaxed text-gray-400 md:text-sm">
              An open space throughout the event to connect with students,
              showcase the organization, and find future team members.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="group border-b border-gray-800/50 p-8 md:border-r md:border-b-0 md:p-10 lg:p-12">
            <h3 className="font-heading mb-6 text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Talks
            </h3>

            <p className="font-sans text-xs leading-relaxed text-gray-400 md:text-sm">
              An auditorium session to present the organization's work, vision, and
              challenges before an attentive and engaged audience.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="group p-8 md:p-10 lg:p-12">
            <h3 className="font-heading mb-6 text-2xl font-medium text-white transition-colors group-hover:text-[#00a8e8] md:text-3xl">
              Workshops
            </h3>

            <p className="font-sans text-xs leading-relaxed text-gray-400 md:text-sm">
              A hands-on session in small groups to demonstrate everyday tools,
              methods, and ideas up close.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/*
      <motion.section 
        {...zoomIn}
        className="py-16 md:py-24 mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16"
      >
        <h2 className="font-heading mb-16 text-left text-lg font-bold tracking-[0.2em] text-[#00a8e8] uppercase md:mb-20">
          Partners
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

                <div className="grid grid-cols-2 justify-items-center items-end gap-x-15 gap-y-12 md:flex md:flex-wrap md:justify-center md:gap-16">
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
                          className="max-h-12 w-auto object-contain opacity-40 transition-opacity group-hover:opacity-100 md:max-h-32"
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
      </motion.section>
      */}

      <motion.section 
        {...blurReveal}
        className="relative py-20 text-white md:py-28 border-y border-gray-800/50 overflow-hidden"
      >
        <div className="bg-[#06151D] bg-grid absolute inset-0 opacity-80 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />

        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#06151D] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#06151D] to-transparent pointer-events-none z-10" />

        <span className="absolute top-[20%] left-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]" />
        <span className="absolute bottom-[20%] right-[10%] size-1.5 animate-blink rounded-full bg-[#00a8e8] shadow-[0_0_8px_#00a8e8] [animation-delay:1s]" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-[#00a8e8] to-transparent shadow-[0_0_12px_rgba(0,168,232,0.8)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 mx-auto max-w-xl md:max-w-4xl">
          <p className="font-mono mb-6 text-[11px] sm:text-xs tracking-[0.2em] text-[#00a8e8] uppercase">
            The next chapter starts now
          </p>

          <h2 className="font-sans mb-10 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-6xl md:leading-tight">
            40 years of history.
            <br />
            <span>A vision for the</span>
            <br className="block md:hidden" />
            <span> future.</span>
          </h2>
          {/*
          <Link
            href="#entrar"
            className="font-mono flex w-full items-center justify-between bg-[#00a8e8] px-6 py-4 text-xs font-semibold text-white transition-all hover:bg-[#0090c7] sm:w-auto sm:min-w-80 md:text-sm"
          >
            <span>Join the event</span>
            <span>→</span>
          </Link>
          */}
        </div>
      </motion.section>

      {/*ESTE É O ULTIMO PORQUE NAO HA MAIS :D*/}
      <div className="mx-auto w-full max-w-400 px-2 sm:px-10 lg:px-16 pt-16 md:pt-24">
        <Footer />
      </div>
    </main>
  );
}