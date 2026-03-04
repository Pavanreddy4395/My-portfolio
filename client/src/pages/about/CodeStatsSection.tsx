import type { ReactNode } from "react";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

function ActivityHeatmap({ platformId, accent }: { platformId: string; accent: Accent }) {
  const levels = getHeatmapLevelClasses(accent);

  const cells = useMemo(() => {
    const rand = mulberry32(hashString(`heatmap:${platformId}`));
    const weeks = 52;
    const days = 7;
    const out: number[] = [];

    for (let w = 0; w < weeks; w += 1) {
      for (let d = 0; d < days; d += 1) {
        const r = rand();
        const v =
          r < 0.86 ? 0 : r < 0.91 ? 1 : r < 0.95 ? 2 : r < 0.98 ? 3 : 4;
        out.push(v);
      }
    }
    return out;
  }, [platformId]);

  const monthLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const weekLabelPositions = [2, 6, 10, 14, 18, 23, 27, 32, 36, 41, 46, 50];

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

function RatingHistory({ platformId, accent, baseRating }: { platformId: string; accent: Accent; baseRating: number }) {
  const data = useMemo(() => {
    const rand = mulberry32(hashString(`history:${platformId}`));
    const points = 20;
    const start = new Date("2025-06-15T00:00:00Z");
    let current = baseRating;

    const out: Array<{ date: string; rating: number }> = [];
    for (let i = 0; i < points; i += 1) {
      const drift = (rand() - 0.48) * 80;
      current = Math.max(0, Math.round(current + drift));
      const d = new Date(start);
      d.setUTCDate(start.getUTCDate() + i * 14);
      out.push({ date: d.toISOString().slice(0, 10), rating: current });
    }

    return out;
  }, [platformId, baseRating]);

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
            <Line
              type="monotone"
              dataKey="rating"
              stroke="currentColor"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PlatformPanel({ platform, className }: { platform: Platform; className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 sm:p-6 overflow-hidden w-full min-w-0",
        className
      )}
    >
      <div className="space-y-5">
        <h3 className={cn("text-2xl font-display font-bold", getAccentTextClass(platform.accent))}>
          {platform.title}
        </h3>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch"> */}
        <div className="grid grid-cols-2 gap-6 items-stretch">
          {platform.stats.map((stat) => (
            <StatBox key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="space-y-3">
          <div className="text-sm font-mono tracking-wide text-muted-foreground">Activity Heatmap</div>
          <ActivityHeatmap platformId={platform.id} accent={platform.accent} />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-mono tracking-wide text-muted-foreground">Rating History</div>
          <RatingHistory
            platformId={platform.id}
            accent={platform.accent}
            baseRating={platform.historyBase ?? 1200}
          />
        </div>
      </div>
    </Card>
  );
}

export default function CodeStatsSection() {
  const platforms: Platform[] = [
    {
      id: "tryhackme",
      title: "TryHackMe",
      accent: "primary",
      stats: [
        { label: "Rank", value: "—" },
        { label: "Rooms Completed", value: "—" },
        { label: "Badges", value: "—" },
        { label: "Data Points", value: "—" },
      ],
      historyBase: 900,
    },
    {
      id: "picoctf",
      title: "PicoCTF",
      accent: "primary",
      stats: [
        { label: "Challenges", value: "—" },
        { label: "Score", value: "—" },
        { label: "Rank", value: "—" },
        { label: "Data Points", value: "—" },
      ],
      historyBase: 800,
    },
    {
      id: "codechef",
      title: "CodeChef",
      accent: "primary",
      stats: [
        { label: "Rating", value: "1405" },
        { label: "Problems Solved", value: "250+" },
        { label: "Last Active", value: "—" },
        { label: "Data Points", value: "—" },
      ],
      historyBase: 1200,
    },
    {
      id: "codeforces",
      title: "Codeforces",
      accent: "primary",
      stats: [
        { label: "Rating", value: "1999" },
        { label: "Problems Solved", value: "115" },
        { label: "Last Active", value: "17 Jan 2026, 21:52" },
        { label: "Data Points", value: "148" },
      ],
      historyBase: 1400,
    },
    {
      id: "leetcode",
      title: "LeetCode",
      accent: "away",
      stats: [
        { label: "Rating", value: "1331" },
        { label: "Problems Solved", value: "142" },
        { label: "Last Active", value: "18 Jan 2026, 09:09" },
        { label: "Data Points", value: "20" },
      ],
      historyBase: 1500,
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
