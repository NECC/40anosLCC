"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programa", href: "/programa" },
    { name: "Empresas", href: "" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="flex items-center justify-between py-6 border-b border-white/5 bg-[#06151D]">
      <Image src="/40.svg" alt="Logo 40 Anos" width={48} height={48} />

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

      <Link
        href="/entrar"
        className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-300 hover:text-white transition-colors"
      >
        ENTRAR <span className="text-[#00a8e8]">→</span>
      </Link>

      <button className="md:hidden flex flex-col justify-between w-6 h-4 text-gray-300">
        <span className="w-full h-0.5 bg-current rounded-full"></span>
        <span className="w-full h-0.5 bg-current rounded-full"></span>
        <span className="w-full h-0.5 bg-current rounded-full"></span>
      </button>
    </nav>
  );
}
