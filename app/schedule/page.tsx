"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Activity } from "@/types";

const TZ = "Europe/Lisbon";

const filters = [
  { label: "All", value: "ALL" },
  { label: "Talks", value: "TALK" },
  { label: "Workshops", value: "WORKSHOP" },
];

const typeLabels: Record<string, string> = {
  TALK: "Talk",
  WORKSHOP: "Workshop",
  LECTURE: "Lecture",
  PANEL: "Panel",
  CONFERENCE: "Conference",
};

const dayKey = (date: string) =>
  new Date(date).toLocaleDateString("en-CA", { timeZone: TZ });

const time = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(date));

const dayLabel = (key: string) => {
  const d = new Date(`${key}T12:00:00`);
  return {
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(d),
    date: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
    }).format(d),
  };
};

export default function SchedulePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [day, setDay] = useState("");

  useEffect(() => {
    axios
      .get<Activity[]>("/api/activities")
      .then(({ data }) => {
        setActivities(data);
        const first = data.map((a) => dayKey(a.startDate)).sort()[0];
        if (first) setDay(first);
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const days = useMemo(
    () => [...new Set(activities.map((a) => dayKey(a.startDate)))].sort(),
    [activities],
  );

  const visible = useMemo(
    () =>
      activities
        .filter((a) => dayKey(a.startDate) === day)
        .filter((a) => filter === "ALL" || a.type === filter)
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        ),
    [activities, day, filter],
  );

  return (
    <main className="min-h-screen bg-[#06151D] px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-space-grotesk text-4xl font-bold tracking-tight text-white md:text-5xl">
          Schedule
        </h1>

        {loading ? (
          <div className="mt-12 space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded bg-white/5" />
            ))}
          </div>
        ) : error ? (
          <p className="mt-12 font-manrope text-gray-400">
            Couldn&apos;t load the schedule. Refresh the page to try again.
          </p>
        ) : (
          <>
            {/* DAYS */}
            <div className="mt-10 flex gap-2 overflow-x-auto">
              {days.map((d) => {
                const { weekday, date } = dayLabel(d);
                const active = d === day;
                return (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`shrink-0 rounded-full px-5 py-2 font-space-grotesk text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#00a8e8] ${
                      active
                        ? "bg-[#00a8e8] font-medium text-[#06151D]"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {weekday}, {date}
                  </button>
                );
              })}
            </div>

            {/* FILTERS */}
            <div className="mt-6 flex gap-6 border-b border-white/10">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`-mb-px border-b-2 pb-3 font-manrope text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#00a8e8] ${
                    filter === f.value
                      ? "border-[#00a8e8] text-white"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* ACTIVITIES */}
            {visible.length === 0 ? (
              <p className="mt-12 font-manrope text-gray-500">
                Nothing scheduled here. Try another day or filter.
              </p>
            ) : (
              <ol className="divide-y divide-white/10">
                {visible.map((a) => (
                  <li
                    key={a.id}
                    className="grid gap-2 py-8 md:grid-cols-[110px_1fr] md:gap-8"
                  >
                    <div className="font-space-grotesk">
                      <p className="text-xl font-medium text-[#00a8e8]">
                        {time(a.startDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        to {time(a.endDate)}
                      </p>
                    </div>

                    <div>
                      <h2 className="font-space-grotesk text-xl font-medium text-white md:text-2xl">
                        {a.title}
                      </h2>
                      <p className="mt-1 font-manrope text-sm text-gray-500">
                        {typeLabels[a.type] ?? a.type}
                        {a.speakers.length > 0 &&
                          ` with ${a.speakers.join(", ")}`}
                      </p>
                      {a.description && (
                        <p className="mt-4 max-w-prose font-manrope text-sm leading-relaxed text-gray-400">
                          {a.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </div>
    </main>
  );
}
