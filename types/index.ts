export type Partner = {
  name: string;
  image: string;
  tier: "Gold" | "Silver" | "Bronze";
};

export type Activity = {
  id: string;
  title: string;
  speakers: string[];
  description: string;
  startDate: string;
  endDate: string;
  type: ActivityType;
};

type ActivityType = "WORKSHOP" | "TALK";
