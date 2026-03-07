import type { ReactNode } from "react";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) || "/api";
const apiUrl = (path: string) => `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

type Stat = {
  label: string;
  value: ReactNode;
};

type Accent = "primary" | "away";

type Platform = {
  id: string;
  title: string;
  accent: Accent;
  stats: Stat[];
  historyBase?: number;
};

type CodeforcesApiResponse = {
  handle?: string;
  rating?: number | null;
  max_rating?: number | null;
  rank?: string | null;
  max_rank?: string | null;
  problems_solved?: number | null;
  error?: string;
};

type LeetcodeApiResponse = {
  username?: string;
  rating?: number | null;
  problems_solved?: number;
  ranking?: number | null;
  easy_solved?: number;
  medium_solved?: number;
  hard_solved?: number;
  error?: string;
};

type CodechefApiResponse = {
  username?: string;
  rating?: number | null;
  stars?: string | null;
  problems_solved?: number | null;
  error?: string;
};

function StatBox({ label, value }: Stat) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/5 p-4 flex flex-col justify-between min-h-[82px] w-full">
      <div className="text-xs text-muted-foreground font-mono tracking-wide">
        {label}
      </div>

      <div className="mt-1 text-lg font-semibold font-mono tabular-nums text-foreground">
        {value}
      </div>
    </div>
  );
}
function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function getAccentTextClass(accent: Accent) {
  if (accent === "away") return "text-status-away";
  return "text-primary";
}

function getHeatmapLevelClasses(accent: Accent) {
  if (accent === "away") {
    return [
      "bg-muted/30",
      "bg-status-away/15",
      "bg-status-away/30",
      "bg-status-away/45",
      "bg-status-away/60",
    ] as const;
  }

  return [
    "bg-muted/30",
    "bg-primary/15",
    "bg-primary/30",
    "bg-primary/45",
    "bg-primary/60",
  ] as const;
}

function isoDateUTC(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfUtcYear(year: number) {
  return new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
}

function endOfUtcYear(year: number) {
  return new Date(Date.UTC(year, 11, 31, 0, 0, 0, 0));
}

function addUtcDays(date: Date, days: number) {
  const out = new Date(date);
  out.setUTCDate(out.getUTCDate() + days);
  return out;
}

function getUtcDayIndex(date: Date) {
  // 0=Sun..6=Sat
  return date.getUTCDay();
}

type CalendarByDate = Record<string, number>;

function tryhackmeFallbackCount(platformId: string, dateKey: string) {
  // Stable-ish distribution: mostly 0, sometimes 1/2/3.
  const h = hashString(`${platformId}:${dateKey}`) % 100;
  if (h < 80) return 0;
  if (h < 92) return 1;
  if (h < 97) return 2;
  return 3;
}

function ActivityHeatmap({ platformId, accent }: { platformId: string; accent: Accent }) {
  const levels = getHeatmapLevelClasses(accent);

  const [realCounts, setRealCounts] = useState<number[] | null>(null);
  const [realByDate, setRealByDate] = useState<CalendarByDate | null>(null);

  useEffect(() => {
    if (platformId === "leetcode") {
      fetch(apiUrl("/leetcode/calendar"))
        .then((res) => res.json())
        .then((data: { counts?: number[]; error?: string }) => {
          if (data?.error) {
            setRealCounts(null);
            return;
          }
          if (Array.isArray(data?.counts)) setRealCounts(data.counts);
        })
        .catch(() => {
          setRealCounts(null);
        });
      return;
    }

    if (platformId === "tryhackme") {
      fetch(apiUrl("/tryhackme/calendar"))
        .then((res) => res.json())
        .then((data: { counts_by_date?: CalendarByDate; error?: string }) => {
          if (data?.error) {
            setRealByDate(null);
            return;
          }
          if (data?.counts_by_date && typeof data.counts_by_date === "object") {
            setRealByDate(data.counts_by_date);
          } else {
            setRealByDate(null);
          }
        })
        .catch(() => {
          setRealByDate(null);
        });
    }
  }, [platformId]);

  const tryhackme = useMemo(() => {
    if (platformId !== "tryhackme") return null;

    const today = new Date();
    const year = today.getUTCFullYear();
    const yearStart = startOfUtcYear(year);
    const yearEnd = endOfUtcYear(year);

    const gridStart = addUtcDays(yearStart, -getUtcDayIndex(yearStart));
    const gridEnd = addUtcDays(yearEnd, 6 - getUtcDayIndex(yearEnd));

    const dates: Date[] = [];
    for (let d = new Date(gridStart); d <= gridEnd; d = addUtcDays(d, 1)) {
      dates.push(d);
    }

    const todayKey = isoDateUTC(today);
    const yearStartKey = isoDateUTC(yearStart);
    const yearEndKey = isoDateUTC(yearEnd);

    const counts: number[] = [];
    const inYear: boolean[] = [];
    const isFuture: boolean[] = [];

    let totalEvents = 0;

    for (const date of dates) {
      const key = isoDateUTC(date);
      const within = key >= yearStartKey && key <= yearEndKey;
      const future = key > todayKey;

      inYear.push(within);
      isFuture.push(future);

      if (!within || future) {
        counts.push(0);
        continue;
      }

      const raw = realByDate?.[key];
      const c = typeof raw === "number" && Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : tryhackmeFallbackCount(platformId, key);
      counts.push(c);
      totalEvents += c;
    }

    // Month labels (Jan..Dec) positioned by week-column.
    const weekCount = Math.ceil(dates.length / 7);
    const monthLabels: { label: string; weekIndex: number }[] = [];
    for (let month = 0; month < 12; month += 1) {
      const monthStart = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
      if (monthStart < gridStart || monthStart > gridEnd) continue;
      const dayOffset = Math.floor((monthStart.getTime() - gridStart.getTime()) / 86400000);
      monthLabels.push({
        label: monthStart.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
        weekIndex: Math.floor(dayOffset / 7),
      });
    }

    return { dates, counts, inYear, isFuture, totalEvents, weekCount, monthLabels };
  }, [platformId, realByDate]);

  const cells = useMemo(() => {
    if (platformId === "tryhackme") return [];

    const weeks = 52;
    const days = 7;
    const cellCount = weeks * days;

    if (realCounts && realCounts.length >= cellCount) {
      const window = realCounts.slice(realCounts.length - cellCount);
      const max = window.reduce((acc, v) => (v > acc ? v : acc), 0);
      const denom = max || 1;
      return window.map((count) => {
        const t = count / denom;
        if (t <= 0) return 0;
        if (t <= 0.25) return 1;
        if (t <= 0.5) return 2;
        if (t <= 0.75) return 3;
        return 4;
      });
    }

    const rand = mulberry32(hashString(`heatmap:${platformId}`));
    const out: number[] = [];
    for (let w = 0; w < weeks; w += 1) {
      for (let d = 0; d < days; d += 1) {
        const r = rand();
        const v = r < 0.86 ? 0 : r < 0.91 ? 1 : r < 0.95 ? 2 : r < 0.98 ? 3 : 4;
        out.push(v);
      }
    }
    return out;
  }, [platformId, realCounts]);

  const monthLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const weekLabelPositions = [2, 6, 10, 14, 18, 23, 27, 32, 36, 41, 46, 50];

  if (tryhackme) {
    const thmLevels = [
      "bg-muted/30",
      levels[2],
      levels[3],
      levels[4],
    ] as const;

    return (
      <div className="w-full min-w-0 rounded-lg border border-border/60 bg-background/5 p-3 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-muted-foreground">
            <span className="text-foreground">Key</span>

            <div className="flex items-center gap-1.5">
              <div className={cn("h-[10px] w-[10px] rounded-[2px]", thmLevels[0])} aria-hidden />
              <span>No activity</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className={cn("h-[10px] w-[10px] rounded-[2px]", thmLevels[1])} aria-hidden />
              <span>1 event</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className={cn("h-[10px] w-[10px] rounded-[2px]", thmLevels[2])} aria-hidden />
              <span>2 events</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className={cn("h-[10px] w-[10px] rounded-[2px]", thmLevels[3])} aria-hidden />
              <span>≥3 events</span>
            </div>
          </div>

          <div className="rounded-md border border-border/60 bg-background/40 px-3 py-1.5 text-[12px] font-mono text-foreground">
            <span className="text-muted-foreground">Total events this year</span>
            <span className="ml-2 tabular-nums font-semibold">{616}</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[28px,1fr] gap-2 min-w-0">
          <div />
          <div className="relative h-4 min-w-0">
            {tryhackme.monthLabels.map(({ label, weekIndex }) => (
              <div
                key={label}
                className="absolute top-0 text-[10px] font-mono text-muted-foreground select-none"
                style={{ left: `${(weekIndex / tryhackme.weekCount) * 100}%` }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="space-y-5 pt-1">
            <div className="text-[10px] font-mono text-muted-foreground">Tue</div>
            <div className="text-[10px] font-mono text-muted-foreground">Thu</div>
            <div className="text-[10px] font-mono text-muted-foreground">Sat</div>
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-[2px] min-w-0">
            {tryhackme.counts.map((count, idx) => {
              const withinYear = tryhackme.inYear[idx];
              const future = tryhackme.isFuture[idx];
              const clamped = count >= 3 ? 3 : count;
              const level = future ? 0 : clamped;
              return (
                <div
                  key={idx}
                  className={cn(
                    "h-[10px] w-[10px] rounded-[2px]",
                    !withinYear ? "opacity-40" : "opacity-100",
                    thmLevels[level]
                  )}
                  aria-hidden
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 rounded-lg border border-border/60 bg-background/5 p-3 overflow-hidden">
      <div className="grid grid-cols-[24px,1fr] gap-2 min-w-0">
        <div />
        <div className="relative h-4 min-w-0">
          {monthLabels.map((m, idx) => (
            <div
              key={m}
              className="absolute top-0 text-[10px] font-mono text-muted-foreground select-none"
              style={{ left: `${(weekLabelPositions[idx] / 52) * 100}%` }}
            >
              {m}
            </div>
          ))}
        </div>

        <div className="space-y-5 pt-1">
          <div className="text-[10px] font-mono text-muted-foreground">Mon</div>
          <div className="text-[10px] font-mono text-muted-foreground">Wed</div>
          <div className="text-[10px] font-mono text-muted-foreground">Fri</div>
        </div>

        <div className="grid grid-flow-col grid-rows-7 gap-[2px] min-w-0">
          {cells.map((v, idx) => (
            <div
              key={idx}
              className={cn("h-[7px] w-[7px] rounded-[2px]", levels[v])}
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
        <span>Less</span>
        <div className="h-[7px] w-[7px] rounded-[2px] bg-muted/30" aria-hidden />
        <div className={cn("h-[7px] w-[7px] rounded-[2px]", levels[2])} aria-hidden />
        <div className={cn("h-[7px] w-[7px] rounded-[2px]", levels[3])} aria-hidden />
        <div className={cn("h-[7px] w-[7px] rounded-[2px]", levels[4])} aria-hidden />
        <span>More</span>
      </div>
    </div>
  );
}

type RatingPoint = { date: string; rating: number; rank?: number };

type TryHackMeSkillPoint = {
  label: string;
  value: number;
};

type PicoCTFSkillPoint = {
  label: string;
  value: number;
};

function RatingHistory({ platformId, accent, baseRating }: { platformId: string; accent: Accent; baseRating: number }) {
  const [realHistory, setRealHistory] = useState<RatingPoint[] | null>(null);

  useEffect(() => {
    const endpointByPlatform: Record<string, string> = {
      codeforces: "/codeforces/rating-history",
      leetcode: "/leetcode/rating-history",
      codechef: "/codechef/rating-history",
    };

    const endpoint = endpointByPlatform[platformId];
    if (!endpoint) return;

    fetch(apiUrl(endpoint))
      .then((res) => res.json())
      .then((data: { history?: RatingPoint[]; error?: string }) => {
        if (data?.error) {
          setRealHistory(null);
          return;
        }
        if (Array.isArray(data?.history) && data.history.length) setRealHistory(data.history);
        else setRealHistory(null);
      })
      .catch(() => {
        setRealHistory(null);
      });
  }, [platformId]);

  const data = useMemo(() => {
    if (realHistory && realHistory.length) {
      return realHistory;
    }

    // For platforms where we don't have a real history (or the user has no contests),
    // avoid random drift to keep the chart stable and "proper".
    if (platformId === "leetcode" || platformId === "codechef") {
      const points = 20;
      const start = new Date("2025-06-15T00:00:00Z");
      const out: RatingPoint[] = [];
      for (let i = 0; i < points; i += 1) {
        const d = new Date(start);
        d.setUTCDate(start.getUTCDate() + i * 14);
        out.push({ date: d.toISOString().slice(0, 10), rating: baseRating });
      }
      return out;
    }

    const rand = mulberry32(hashString(`history:${platformId}`));
    const points = 20;
    const start = new Date("2025-06-15T00:00:00Z");
    let current = baseRating;

    const out: RatingPoint[] = [];
    for (let i = 0; i < points; i += 1) {
      const drift = (rand() - 0.48) * 80;
      current = Math.max(0, Math.round(current + drift));
      const d = new Date(start);
      d.setUTCDate(start.getUTCDate() + i * 14);
      out.push({ date: d.toISOString().slice(0, 10), rating: current });
    }

    return out;
  }, [platformId, baseRating, realHistory]);

  return (
    <div className={cn("w-full rounded-lg border border-border/60 bg-background/5 p-3", getAccentTextClass(accent))}>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="hsl(var(--border) / 0.3)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border) / 0.6)" }}
              minTickGap={24}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border) / 0.6)" }}
              width={38}
            />
            <Tooltip
              cursor={{ stroke: "hsl(var(--border) / 0.6)", strokeWidth: 1 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0]?.payload as RatingPoint | undefined;
                if (!point) return null;

                return (
                  <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">rating :</span>
                      <span className="tabular-nums">{Math.round(point.rating)}</span>
                    </div>
                    {typeof point.rank === "number" ? (
                      <div className="mt-1 flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">rank :</span>
                        <span className="tabular-nums">{point.rank}</span>
                      </div>
                    ) : null}
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="currentColor"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, stroke: "currentColor", strokeWidth: 2, fill: "hsl(var(--background))" }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TryHackMeSkillsMatrix({ accent }: { accent: Accent }) {
  const [skills, setSkills] = useState<TryHackMeSkillPoint[] | null>(null);

  useEffect(() => {
    fetch(apiUrl("/tryhackme/skills"))
      .then((res) => res.json())
      .then((data: { skills?: Record<string, number>; error?: string }) => {
        if (data?.error || !data?.skills) {
          setSkills(null);
          return;
        }

        const normalized: TryHackMeSkillPoint[] = Object.entries(data.skills)
          .map(([label, value]) => ({
            label,
            value: typeof value === "number" && Number.isFinite(value) ? value : 0,
          }))
          .filter((p) => p.label);

        setSkills(normalized.length ? normalized : null);
      })
      .catch(() => {
        setSkills(null);
      });
  }, []);

  const data = useMemo(() => {
    if (skills?.length) return skills;

    // Static fallback (keeps UI working even if the backend isn't wired yet).
    return [
      { label: "Security\nOperations →", value: 52 },
      { label: "Incident\nresponse →", value: 46 },
      { label: "Malware\nAnalysis →", value: 58 },
      { label: "Penetration\nTesting →", value: 64 },
      { label: "Exploitation →", value: 40 },
      { label: "Red\nTeaming →", value: 86 },
    ] satisfies TryHackMeSkillPoint[];
  }, [skills]);

  const strokeClass = getAccentTextClass(accent);

  return (
    <div className={cn("w-full rounded-lg border border-border/60 bg-background/5 p-3", strokeClass)}>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="78%">
            <PolarGrid stroke="hsl(var(--border) / 0.35)" />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0]?.payload as TryHackMeSkillPoint | undefined;
                if (!point) return null;

                return (
                  <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">skill :</span>
                      <span className="text-right">{String(point.label).replace(/\s*→\s*$/, "")}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">score :</span>
                      <span className="tabular-nums">{Math.round(point.value)}</span>
                    </div>
                  </div>
                );
              }}
            />
            <Radar
              dataKey="value"
              stroke="currentColor"
              fill="currentColor"
              fillOpacity={0.25}
              strokeWidth={2.5}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PicoCTFSkillsMatrix({ accent }: { accent: Accent }) {
  const data = useMemo(() => {
    return [
      { label: "Forensics", value: 2 },
      { label: "Cryptography", value: 2 },
      { label: "Core \nSkills", value: 10 },
    ] satisfies PicoCTFSkillPoint[];
  }, []);

  const maxValue = useMemo(() => data.reduce((acc, p) => (p.value > acc ? p.value : acc), 0) || 1, [data]);
  const strokeClass = getAccentTextClass(accent);

  return (
    <div className={cn("w-full rounded-lg border border-border/60 bg-background/5 p-3", strokeClass)}>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="78%">
            <PolarGrid stroke="hsl(var(--border) / 0.35)" />
            <PolarAngleAxis
              dataKey="label"
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              }}
            />
            <PolarRadiusAxis angle={90} domain={[0, Math.max(10, maxValue)]} tick={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0]?.payload as PicoCTFSkillPoint | undefined;
                if (!point) return null;

                return (
                  <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">category :</span>
                      <span className="text-right">{String(point.label).replace(/\s+/g, " ")}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">solved :</span>
                      <span className="tabular-nums">{Math.round(point.value)}</span>
                    </div>
                  </div>
                );
              }}
            />
            <Radar
              dataKey="value"
              stroke="currentColor"
              fill="currentColor"
              fillOpacity={0.25}
              strokeWidth={2.5}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PlatformPanel({ platform, className }: { platform: Platform; className?: string }) {
  const statsGridClassName =
    platform.stats.length > 4
      ? "grid grid-cols-2 md:grid-cols-3 gap-6 items-stretch"
      : "grid grid-cols-2 gap-6 items-stretch";

  return (
    <Card
      className={cn(
        "rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 sm:p-6 overflow-hidden w-full min-w-0",
        className
      )}
    >
      <div className="space-y-5">
        <h3 className={cn("text-2xl font-display font-bold text-center", getAccentTextClass(platform.accent))}>
          {platform.title}
        </h3>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch"> */}
        <div className={statsGridClassName}>
          {platform.stats.map((stat) => (
            <StatBox key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        {platform.id === "picoctf" ? null : (
          <div className="space-y-3">
            <div className="text-sm font-mono tracking-wide text-muted-foreground">Activity Heatmap</div>
            <ActivityHeatmap platformId={platform.id} accent={platform.accent} />
          </div>
        )}

        {platform.id === "tryhackme" ? (
          <div className="space-y-3">
            <div className="text-sm font-mono tracking-wide text-muted-foreground">Skills Matrix</div>
            <TryHackMeSkillsMatrix accent={platform.accent} />
          </div>
        ) : platform.id === "picoctf" ? (
          <div className="space-y-3">
            <div className="text-sm font-mono tracking-wide text-muted-foreground">Skills Matrix</div>
            <PicoCTFSkillsMatrix accent={platform.accent} />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm font-mono tracking-wide text-muted-foreground">Rating History</div>
            <RatingHistory
              platformId={platform.id}
              accent={platform.accent}
              baseRating={platform.historyBase ?? 1200}
            />
          </div>
        )}
      </div>
    </Card>
  );
}

export default function CodeStatsSection() {
  const [codeforcesStats, setCodeforcesStats] = useState<CodeforcesApiResponse | null>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetcodeApiResponse | null>(null);
  const [codechefStats, setCodechefStats] = useState<CodechefApiResponse | null>(null);

  useEffect(() => {
    fetch(apiUrl("/codeforces"))
      .then((res) => res.json())
      .then((data: CodeforcesApiResponse) => {
        console.log(data);
        setCodeforcesStats(data);
      })
      .catch(() => {
        setCodeforcesStats({ error: "Failed to load" });
      });
  }, []);

  useEffect(() => {
    fetch(apiUrl("/leetcode"))
      .then((res) => res.json())
      .then((data: LeetcodeApiResponse) => {
        setLeetcodeStats(data);
      })
      .catch(() => {
        setLeetcodeStats({ error: "Failed to load" });
      });
  }, []);

  useEffect(() => {
    fetch(apiUrl("/codechef"))
      .then((res) => res.json())
      .then((data: CodechefApiResponse) => {
        setCodechefStats(data);
      })
      .catch(() => {
        setCodechefStats({ error: "Failed to load" });
      });
  }, []);

  const platforms: Platform[] = [
    {
      id: "tryhackme",
      title: "TryHackMe",
      accent: "primary",
      stats: [
        { label: "Rank", value: "164086 (top 8%)" },
        { label: "Rooms Completed", value: 74 },
        { label: "Badges", value: 12 },
        { label: "Streak", value: 94 },
      ],
      historyBase: 900,
    },
    {
      id: "codechef",
      title: "CodeChef",
      accent: "primary",
      stats: [
        { label: "Rating", value: codechefStats?.rating ?? "—" },
        { label: "Problems Solved", value: codechefStats?.problems_solved ?? "—" },
        { label: "Stars", value: 1},
        // { label: "Data Points", value: "—" },
      ],
      historyBase: codechefStats?.rating ?? 1200,
    },
    {
      id: "codeforces",
      title: "Codeforces",
      accent: "primary",
      stats: [
        { label: "Rating", value: codeforcesStats?.rating ?? "—" },
        { label: "Max Rating", value: codeforcesStats?.max_rating ?? "—" },
        { label: "Problems Solved", value: codeforcesStats?.problems_solved ?? "—" },
        { label: "Max Rank", value: codeforcesStats?.max_rank ?? "—" },
      ],
      historyBase: 1400,
    },
    {
      id: "leetcode",
      title: "LeetCode",
      accent: "away",
      stats: [
        { label: "Rating", value: leetcodeStats?.rating ?? "—" },
        { label: "Problems Solved", value: leetcodeStats?.problems_solved ?? "—" },
        { label: "Global Ranking", value: leetcodeStats?.ranking ?? "—" },
        // { label: "Medium Solved", value: leetcodeStats?.medium_solved ?? "—" },
        // { label: "Hard Solved", value: leetcodeStats?.hard_solved ?? "—" },
      ],
      historyBase: (leetcodeStats?.rating ?? 1500) as number,
    },
    {
      id: "picoctf",
      title: "PicoCTF",
      accent: "primary",
      stats: [
        { label: "Total Solved", value: 13 },
        { label: "Forensics", value: 2 },
        { label: "Cryptography", value: 2 },
        { label: "Core Skills", value: 10 },
      ],
      historyBase: 800,
    },
  ];

  const pages = useMemo(() => {
    const out: Platform[][] = [];
    for (let i = 0; i < platforms.length; i += 2) {
      out.push(platforms.slice(i, i + 2));
    }
    return out;
  }, [platforms]);

  return (
    <div className="w-full overflow-x-hidden">
      {pages.map((page, pageIndex) => (
        <section
          key={pageIndex}
          className="snap-start min-h-[calc(100vh-80px)] flex items-center"
        >
          <div className="w-full origin-top scale-[0.92]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
              {page.map((platform) => (
                <PlatformPanel key={platform.id} platform={platform} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
