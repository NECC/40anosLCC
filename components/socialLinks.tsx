import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import type { Speaker } from "@/types/index";

interface SocialLinksProps {
  socials: Speaker["socials"];
  name: string;
}

export default function SocialLinks({ socials, name }: SocialLinksProps) {
  const items = [
    { href: socials.github, label: "GitHub", Icon: FaGithub },
    { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: socials.twitter, label: "X", Icon: FaXTwitter },
  ].filter((item) => item.href);

  return (
    <div className="flex items-center gap-3 text-white">
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on ${label}`}
          className="transition-colors hover:text-[#00a8e8] focus-visible:text-[#00a8e8] focus-visible:outline-none"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}