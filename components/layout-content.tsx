"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export type LinkNames =
  | "Home"
  | "About"
  | "Schedule"
  | "Login"
  | "Profile"
  | "Backoffice";

export const navLinks: {
  [key in LinkNames]: string;
} = {
  Home: "/",
  About: "/about",
  Schedule: "/schedule",
  Login: "/login",
  Profile: "/profile",
  Backoffice: "/backoffice",
};

const blacklist = [navLinks.Profile, navLinks.Backoffice, navLinks.Login];

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
