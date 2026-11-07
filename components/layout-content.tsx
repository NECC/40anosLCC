"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export type LinkNames = "Home" | "About" | "Schedule" | "SignIn" | "SignUp" | "Profile" | "Empresas" | "Backoffice";

export const navLinks: {
  [key in LinkNames]: string;
} = {
  Home: "/",
  About: "/about",
  Schedule: "/schedule",
  SignIn: "/signin",
  SignUp: "/signup",
  Profile: "/profile",
  Empresas: "/empresas",
  Backoffice: "/backoffice",
};

const blacklist = [navLinks.Profile, navLinks.Backoffice, navLinks.SignIn, ];

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = blacklist.some((path) => pathname.startsWith(path));

  return (
    <>
      {!hideLayout && <Nav />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
