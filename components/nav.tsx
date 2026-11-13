"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import { authClient, useSession } from "@/lib/auth/auth-client";
import { LinkNames, navLinks } from "./layout-content";

const displayLinks: LinkNames[] = ["Home", "About", "Schedule"];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavbarLinks = Object.entries(navLinks).filter(([linkName]) =>
    displayLinks.includes(linkName as LinkNames),
  );

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    closeMenu();
    router.push(navLinks.Home);
    router.refresh();
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#06151D]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-400 items-center justify-between px-2 py-3 sm:px-10 lg:px-16">
        <Link href={navLinks.Home} onClick={closeMenu}>
          <Image
            src="/Finallogo_40anosLCC.svg"
            alt="40 Years Logo"
            width={48}
            height={48}
          />
        </Link>

        <div className="hidden items-center gap-10 text-sm font-light text-gray-300 md:flex">
          {NavbarLinks.map(([name, href]) => {
            const isActive = pathname === href;

            return (
              <Link
                key={name}
                href={href}
                className={`relative transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {name}

                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00a8e8]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden min-w-28 items-center justify-end gap-4 text-sm font-light md:flex">
          {!isPending &&
            (session ? (
              <>
                {session.user.role === "ADMIN" && (
                  <>
                    <Link
                      href={navLinks.Backoffice}
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      Backoffice
                    </Link>
                    <span
                      aria-hidden="true"
                      className="h-5 w-px bg-gray-700/80"
                    />
                  </>
                )}
                <Link
                  href={navLinks.Profile}
                  className="flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
                >
                  <FiUser aria-hidden="true" />
                  {session.user.name}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-gray-400 transition-colors hover:text-white"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <FiLogOut aria-hidden="true" />
                </button>
              </>
            ) : (
              <Link
                href={navLinks.SignIn}
                className={`flex items-center gap-2 transition-colors hover:text-white ${
                  pathname === navLinks.SignIn ? "text-white" : "text-gray-300"
                }`}
              >
                Sign In
                <FaArrowCircleRight />
              </Link>
            ))}
        </div>

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
          {NavbarLinks.map(([name, href]) => {
            const isActive = pathname === href;

            return (
              <Link
                key={name}
                href={href}
                onClick={closeMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className={`font-heading text-2xl tracking-wide transition-colors ${
                  isActive ? "text-[#00a8e8]" : "text-gray-300 hover:text-white"
                }`}
              >
                {name}
              </Link>
            );
          })}

          {!isPending &&
            (session ? (
              <>
                {session.user.role === "ADMIN" && (
                  <Link
                    href={navLinks.Backoffice}
                    onClick={closeMenu}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    className="font-heading text-2xl tracking-wide text-gray-300 transition-colors hover:text-white"
                  >
                    Backoffice
                  </Link>
                )}
                <Link
                  href={navLinks.Profile}
                  onClick={closeMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  className="flex items-center gap-2 font-heading text-2xl tracking-wide text-gray-300 transition-colors hover:text-white"
                >
                  <FiUser aria-hidden="true" />
                  {session.user.name}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  className="flex items-center gap-2 font-heading text-2xl tracking-wide text-gray-300 transition-colors hover:text-white"
                >
                  Sign Out
                  <FiLogOut aria-hidden="true" />
                </button>
              </>
            ) : (
              <Link
                href={navLinks.SignIn}
                onClick={closeMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className={`flex items-center gap-2 font-heading text-2xl tracking-wide transition-colors ${
                  pathname === navLinks.SignIn
                    ? "text-[#00a8e8]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Sign In
                <FaArrowCircleRight />
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}
