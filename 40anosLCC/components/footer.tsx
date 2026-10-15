import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const topLinks = ["Informação geral", "Reportar um problema", "Regulamento"];
  const bottomLinks = ["Guia do participante", "Política de privacidade"];

  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <Link href="/">
          <Image
            src="/40.svg"
            alt="40 Anos"
            width={56}
            height={56}
            className="w-10 md:w-14 h-auto opacity-90"
          />
        </Link>

        <div className="flex flex-col items-start md:items-end gap-2 text-xs md:text-sm text-gray-300">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {topLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="hover:text-white transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {bottomLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="hover:text-white transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-gray-400 pt-0.5">
            <Link
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={20} />
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Github"
            >
              <FiGithub size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
