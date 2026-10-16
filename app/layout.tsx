import type { Metadata } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  title: "40 Anos de LCC",
  description: "Celebração dos 40 anos da Licenciatura em Ciências da Computação.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}