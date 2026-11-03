import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ActivityType } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.activity.deleteMany();

  await prisma.activity.createMany({
    data: [
      {
        title: "Introdução a Docker",
        speakers: ["Ana Silva"],
        description: "Workshop prático sobre containers e docker-compose.",
        startDate: new Date("2026-11-10T10:00:00Z"),
        endDate: new Date("2026-11-10T12:00:00Z"),
        type: ActivityType.WORKSHOP,
      },
      {
        title: "Segurança em Aplicações Web",
        speakers: ["João Costa", "Marta Reis"],
        description: "Talk sobre OWASP Top 10 e boas práticas.",
        startDate: new Date("2026-11-10T14:00:00Z"),
        endDate: new Date("2026-11-10T15:00:00Z"),
        type: ActivityType.TALK,
      },
      {
        title: "Next.js na Prática",
        speakers: ["Pedro Alves"],
        description: "Workshop de construção de uma app com App Router.",
        startDate: new Date("2026-11-11T10:00:00Z"),
        endDate: new Date("2026-11-11T13:00:00Z"),
        type: ActivityType.WORKSHOP,
      },
      {
        title: "Sistemas Distribuídos e Tolerância a Falhas",
        speakers: ["Carla Mendes"],
        description: "Talk sobre consenso, replicação e BFT.",
        startDate: new Date("2026-11-11T15:00:090Z"),
        endDate: new Date("2026-11-11T16:00:00Z"),
        type: ActivityType.TALK,
      },
    ],
  });

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
