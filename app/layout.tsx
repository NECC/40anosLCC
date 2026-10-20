import type { Metadata } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "40 years of LCC",
  icons: {
    icon: "/Finallogo_40anosLCC.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${dmMono.variable} `}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
