import Image from "next/image";

interface SpeakerAvatarProps {
  name: string;
  photo?: string;
}

export default function SpeakerAvatar({ name, photo }: SpeakerAvatarProps) {
  return (
    <div className="relative size-24 shrink-0 overflow-hidden border border-[#00a8e8] bg-linear-to-br from-[#12b5ea] to-[#0b3a52] sm:size-32 md:size-40">
      {photo ? (
        <Image
          src={`/images/speakers/${photo}`}
          alt={name}
          fill
          sizes="(min-width: 768px) 160px, 96px"
          className="object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <circle cx="50" cy="36" r="15" fill="#eaf6f8" />
          <path d="M20 100 C20 74 34 62 50 62 C66 62 80 74 80 100 Z" fill="#eaf6f8" />
        </svg>
      )}
    </div>
  );
}