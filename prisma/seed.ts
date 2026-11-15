import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ActivityType } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const speakerNames = [
  "Carlos Fernandes",
  "Maria Oliveira",
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emma Wilson",
  "David Miller",
  "Robert Anderson",
  "Laura Martinez",
  "James Taylor",
  "Daniel White",
  "Alex Turner",
  "Olivia Parker",
  "Sophia Davis",
  "Emily Clark",
  "William Harris",
  "Ana Silva",
  "Thomas Moore",
  "Peter Jackson",
  "Pedro Alves",
  "University Alumni Association",
];

type ActivitySeed = {
  title: string;
  speakers: string[];
  description: string;
  startDate: string;
  endDate: string;
  type: ActivityType;
};

const activities: ActivitySeed[] = [
  // MARCH 1 — DAY 1
  {
    title: "Opening Ceremony",
    speakers: ["Carlos Fernandes", "Maria Oliveira"],
    description:
      "Welcome session introducing the 40 Years of Computer Science celebrations, the event program, and the future of computing.",
    startDate: "2027-03-01T09:00:00Z",
    endDate: "2027-03-01T09:30:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "The Evolution of Computer Science",
    speakers: ["John Smith"],
    description:
      "An overview of four decades of computer science, exploring the technologies and innovations that shaped the digital world.",
    startDate: "2027-03-01T09:30:00Z",
    endDate: "2027-03-01T10:30:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Introduction to Artificial Intelligence",
    speakers: ["Sarah Johnson"],
    description:
      "Discover the fundamentals of artificial intelligence, machine learning, and their impact on modern society.",
    startDate: "2027-03-01T11:00:00Z",
    endDate: "2027-03-01T12:30:00Z",
    type: ActivityType.WORKSHOP,
  },
  {
    title: "Cybersecurity in the Modern World",
    speakers: ["Michael Brown", "Emma Wilson"],
    description:
      "A discussion about emerging cybersecurity threats, ethical hacking, and strategies for protecting digital infrastructures.",
    startDate: "2027-03-01T14:00:00Z",
    endDate: "2027-03-01T15:00:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Building Your First Web Application",
    speakers: ["David Miller"],
    description:
      "A hands-on workshop covering modern web development using React, Next.js, and TypeScript.",
    startDate: "2027-03-01T15:30:00Z",
    endDate: "2027-03-01T17:00:00Z",
    type: ActivityType.WORKSHOP,
  },
  {
    title: "Alumni Networking Session",
    speakers: ["University Alumni Association"],
    description:
      "An opportunity for current students, graduates, and professionals to connect and share their experiences.",
    startDate: "2027-03-01T17:30:00Z",
    endDate: "2027-03-01T18:30:00Z",
    type: ActivityType.TALK,
  },

  // MARCH 2 — DAY 2
  {
    title: "The Future of Quantum Computing",
    speakers: ["Robert Anderson"],
    description:
      "Explore the principles of quantum computing, current research challenges, and its potential applications.",
    startDate: "2027-03-02T09:00:00Z",
    endDate: "2027-03-02T10:00:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Practical Machine Learning",
    speakers: ["Laura Martinez", "James Taylor"],
    description:
      "Learn how to build, train, and evaluate machine learning models using Python and popular data science libraries.",
    startDate: "2027-03-02T10:30:00Z",
    endDate: "2027-03-02T12:30:00Z",
    type: ActivityType.WORKSHOP,
  },
  {
    title: "Cloud Computing and Distributed Systems",
    speakers: ["Daniel White"],
    description:
      "An introduction to cloud architectures, distributed computing, scalability, and fault tolerance.",
    startDate: "2027-03-02T13:30:00Z",
    endDate: "2027-03-02T14:30:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Ethical Hacking Workshop",
    speakers: ["Alex Turner"],
    description:
      "A practical introduction to penetration testing, vulnerability assessment, and common web application security issues.",
    startDate: "2027-03-02T15:00:00Z",
    endDate: "2027-03-02T17:00:00Z",
    type: ActivityType.WORKSHOP,
  },
  {
    title: "Women in Technology",
    speakers: ["Olivia Parker", "Sophia Davis", "Emily Clark"],
    description:
      "A panel discussion about diversity, career opportunities, and the experiences of women working in the technology industry.",
    startDate: "2027-03-02T17:15:00Z",
    endDate: "2027-03-02T18:15:00Z",
    type: ActivityType.TALK,
  },

  // MARCH 3 — DAY 3
  {
    title: "Software Engineering at Scale",
    speakers: ["William Harris"],
    description:
      "Explore software architecture, engineering practices, and the challenges of developing large-scale applications.",
    startDate: "2027-03-03T09:00:00Z",
    endDate: "2027-03-03T10:00:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Introduction to Docker and Containers",
    speakers: ["Ana Silva"],
    description:
      "A practical workshop on containerization, Docker images, containers, and Docker Compose.",
    startDate: "2027-03-03T10:30:00Z",
    endDate: "2027-03-03T12:00:00Z",
    type: ActivityType.WORKSHOP,
  },
  {
    title: "The Role of Open Source in Technology",
    speakers: ["Thomas Moore", "Peter Jackson"],
    description:
      "Discover how open-source communities drive innovation and contribute to the development of modern software.",
    startDate: "2027-03-03T13:00:00Z",
    endDate: "2027-03-03T14:00:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Next.js in Practice",
    speakers: ["Pedro Alves"],
    description:
      "Build a modern web application using Next.js App Router, server components, and API routes.",
    startDate: "2027-03-03T14:30:00Z",
    endDate: "2027-03-03T16:00:00Z",
    type: ActivityType.WORKSHOP,
  },
  {
    title: "The Next 40 Years of Computer Science",
    speakers: ["John Smith", "Sarah Johnson", "Robert Anderson"],
    description:
      "A roundtable discussion exploring future challenges, emerging technologies, and the next generation of computer scientists.",
    startDate: "2027-03-03T16:15:00Z",
    endDate: "2027-03-03T17:15:00Z",
    type: ActivityType.TALK,
  },
  {
    title: "Closing Ceremony",
    speakers: ["Carlos Fernandes", "Maria Oliveira"],
    description:
      "Closing remarks, acknowledgements, and a celebration of 40 years of Computer Science at the University of Minho.",
    startDate: "2027-03-03T17:30:00Z",
    endDate: "2027-03-03T18:00:00Z",
    type: ActivityType.TALK,
  },
];

async function main() {
  await prisma.activity.deleteMany();
  await prisma.speaker.deleteMany();

  const createdSpeakers = await prisma.speaker.createManyAndReturn({
    data: speakerNames.map((name) => ({ name, bio: "Insert bio here", photo: "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette_719432-3519.jpg?semt=ais_hybrid&w=740&q=80" })),
  });

  const speakerIdByName = new Map(createdSpeakers.map((s) => [s.name, s.id]));

  for (const activity of activities) {
    await prisma.activity.create({
      data: {
        title: activity.title,
        description: activity.description,
        startDate: new Date(activity.startDate),
        endDate: new Date(activity.endDate),
        type: activity.type,
        speakers: {
          connect: activity.speakers.map((name) => {
            const id = speakerIdByName.get(name);
            if (!id) {
              throw new Error(`Speaker not found: ${name}`);
            }
            return { id };
          }),
        },
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());