export type Partner = {
  name: string;
  image: string;
  tier: "Gold" | "Silver" | "Bronze";
};

export type Activity = {
  title: string;
  speakers: Speaker[];
  description: string;
  startDate: string;
  endDate: string;
  type: ActivityType;
};

export type Speaker = {
  name: string;
  bio: string;
  photo?: string;
};

type ActivityType = "WORKSHOP" | "TALK";
