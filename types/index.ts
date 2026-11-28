export type Partner = {
  name: string;
  image: string;
  tier: "Gold" | "Silver" | "Bronze";
};

export type Speaker = {
  id: string;
  name: string;
  role: string;
  company: string;
  talk: string;
  time: string;
  bio: string;
  /** File name inside public/images/speakers */
  photo?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
};

export type Day = {
  id: string;
  day: number;
  month: string;
  speakers: Speaker[];
};
export type Activity = {
  title: string;
  speakers: Speaker[];
  description: string;
  startDate: string;
  endDate: string;
  type: ActivityType;
};

type ActivityType = "WORKSHOP" | "TALK";
