"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#06151D]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-400 items-center justify-between px-2 py-3 sm:px-10 lg:px-16">
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/Finallogo_40anosLCC.svg"
            alt="40 Years Logo"
            width={48}
            height={48}
          />
        </Link>

        <div className="hidden items-center gap-10 text-sm font-light text-gray-300 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00a8e8]" />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href=""
          className={`hidden items-center gap-2  text-sm font-light text-gray-300 transition-colors hover:text-white md:flex ${
            pathname === "/join" ? "text-white" : "text-gray-300"
          }`}
        >
          Join
          <FaArrowCircleRight />
        </Link>

        {/* BOTÃO MOBILE */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center text-gray-300 focus:outline-none md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />

          <span
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      {/* MENU MOBILE */}
      <div
        className={`absolute left-0 top-full w-full border-b border-gray-800/50 bg-[#06151D] shadow-2xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col gap-6 px-2 py-8 sm:px-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className={`font-heading text-2xl tracking-wide transition-colors ${
                  isActive ? "text-[#00a8e8]" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href=""
            onClick={closeMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className={`flex items-center gap-2 font-heading text-2xl tracking-wide transition-colors ${
              pathname === "/join"
                ? "text-[#00a8e8]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Join
            <FaArrowCircleRight />
          </Link>
        </div>
      </div>
    </header>
  );
}
