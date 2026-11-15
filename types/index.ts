export type Partner = {
  name: string;
  image: string;
  tier: "Gold" | "Silver" | "Bronze";
};

export type Activity = {
  id: string;
  title: string;
  speakers: Speaker[];
  description: string;
  startDate: string;
  endDate: string;
  type: ActivityType;
};

export type Speaker = {
  id: string;
  name: string;
  bio: string;
  photo?: string;
};

type ActivityType = "WORKSHOP" | "TALK";
