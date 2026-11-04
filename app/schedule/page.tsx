"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Activity } from "@/types";
import { getDay, getTime, dayLabel } from "@/lib/utils";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const filters = [
  { label: "All", value: "ALL" },
  { label: "Talks", value: "TALK" },
  { label: "Workshops", value: "WORKSHOP" },
];

const typeLabels: Record<string, string> = {
  TALK: "Talk",
  WORKSHOP: "Workshop",
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

        const first = data.map((a) => getDay(a.startDate)).sort()[0];
        if (first) setDay(first);
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const days = [...new Set(activities.map((a) => getDay(a.startDate)))].sort();
  const dayIndex = days.indexOf(day);
  const hasPrev = dayIndex > 0;
  const hasNext = dayIndex !== -1 && dayIndex < days.length - 1;

  const visible = activities
    .filter((a) => getDay(a.startDate) === day)
    .filter((a) => filter === "ALL" || a.type === filter)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

  return (
    <main className="bg-[#06151D] min-h-screen">
      <div className="mx-auto max-w-400 px-2 py-16 sm:px-10 md:py-24 lg:px-16">
        <h1 className="font-space-grotesk text-4xl font-bold tracking-tight text-white md:text-5xl mb-50">
          Four awesome days of learning, sharing, and winning
        </h1>

        {loading ? (
          <div className="mt-12 space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
            <aside className="self-start md:sticky md:top-24">
              {/* DAY + ARROWS */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => hasPrev && setDay(days[dayIndex - 1])}
                  disabled={!hasPrev}
                  aria-label="Previous day"
                  className="text-white transition-opacity hover:text-[#00a8e8] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#00a8e8]"
                >
                  <SlArrowLeft />
                </button>

                <p
                  className="min-w-0 flex-1 text-center font-space-grotesk text-2xl font-medium text-white"
                  aria-live="polite"
                >
                  {day && dayLabel(day)}
                </p>

                <button
                  onClick={() => hasNext && setDay(days[dayIndex + 1])}
                  disabled={!hasNext}
                  aria-label="Next day"
                  className="text-white transition-opacity hover:text-[#00a8e8] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-[#00a8e8]"
                >
                  <SlArrowRight />
                </button>
              </div>

              {/* FILTERS (coluna) */}
              <p className="mt-10 font-manrope text-sm text-gray-400">
                Filter by
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    aria-pressed={filter === f.value}
                    className={`w-full rounded-full border px-5 py-2.5 font-manrope text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#00a8e8] ${
                      filter === f.value
                        ? "border-[#00a8e8] bg-[#00a8e8] font-medium text-[#06151D]"
                        : "border-white/30 text-gray-300 hover:border-white/60"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </aside>

            <section>
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {visible.map((a) => (
                  <li
                    key={a.id}
                    className="grid gap-2 py-8 md:grid-cols-[110px_1fr] md:gap-8"
                  >
                    <div className="font-space-grotesk">
                      <p className="text-xl font-medium text-[#00a8e8]">
                        {getTime(a.startDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        to {getTime(a.endDate)}
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
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
