"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    //{ name: "Schedule", href: "/programa" },
    //{ name: "Companies", href: "/empresas" },
    //{ name: "About", href: "/about" },
  ];

  // Fechar o menu ao clicar num link
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#06151D]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-400 items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <Link href="/" onClick={closeMenu}>
          <Image src="/Finallogo_40anosLCC.svg" alt="40 Years Logo" width={48} height={48} />
        </Link>

        {/* NAVEGAÇÃO DESKTOP (Escondida em Mobile) */}
        <div className="hidden md:flex items-center gap-10 text-sm font-light text-gray-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors hover:text-white ${
                  isActive ? "text-white" : ""
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute left-1/2 -bottom-2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00a8e8]"></span>
                )}
              </Link>
            );
          })}
        </div>
{/* MUDAR O DEBAIXO PARA ESTE!!!
        <Link
          href="/entrar"
          className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-300 hover:text-white transition-colors"
        >
          JOIN <span className="text-[#00a8e8]"><FaArrowCircleRight /></span>
        </Link>
*/}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-300 hover:text-white transition-colors">
          JOIN <span className="text-[#00a8e8]"><FaArrowCircleRight /></span>
        </div>


        
        {/* BOTÃO MOBILE (Hamburger / Fechar) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative flex flex-col justify-center items-center w-8 h-8 text-gray-300 z-50 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-out absolute ${
              isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-out absolute ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-out absolute ${
              isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </button>
      </nav>

      {/* MENU MOBILE DESLIZANTE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-[#06151D] border-b border-gray-800/50 shadow-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className={`font-heading text-2xl tracking-wide transition-colors ${
                      isActive ? "text-[#00a8e8]" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px w-full bg-gray-800/50 my-2" />

              <Link
                href="/entrar"
                onClick={closeMenu}
                className="flex items-center justify-between bg-[#00a8e8] px-6 py-4 text-xs font-semibold text-white transition-all hover:bg-[#0090c7]"
              >
                <span>Join the event</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}