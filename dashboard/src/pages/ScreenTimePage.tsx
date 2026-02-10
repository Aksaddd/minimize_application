import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import SegmentControl from "../components/common/SegmentControl";

/* ── Mock data ──────────────────────────────────────────────────── */

const appUsage = [
  { id: 1, name: "VS Code", process: "Code.exe", category: "Development", categoryColor: "var(--chart-violet)", today: "3h 12m", week: "18h 45m", trend: "up" as const },
  { id: 2, name: "Chrome", process: "chrome.exe", category: "Browsing", categoryColor: "var(--chart-amber)", today: "1h 48m", week: "12h 03m", trend: "down" as const },
  { id: 3, name: "Notion", process: "Notion.exe", category: "Productivity", categoryColor: "var(--chart-emerald)", today: "1h 15m", week: "8h 22m", trend: "flat" as const },
  { id: 4, name: "Discord", process: "Discord.exe", category: "Communication", categoryColor: "var(--chart-rose)", today: "45m", week: "5h 10m", trend: "up" as const },
  { id: 5, name: "Spotify", process: "Spotify.exe", category: "Entertainment", categoryColor: "var(--chart-slate)", today: "22m", week: "2h 48m", trend: "flat" as const },
];

const weeklyData = [
  { day: "Mon", hours: [35, 20, 10, 5, 3] },
  { day: "Tue", hours: [40, 25, 15, 8, 5] },
  { day: "Wed", hours: [30, 28, 12, 6, 4] },
  { day: "Thu", hours: [45, 22, 18, 7, 2] },
  { day: "Fri", hours: [38, 30, 14, 4, 6] },
  { day: "Sat", hours: [15, 10, 25, 2, 20] },
  { day: "Sun", hours: [10, 8, 30, 3, 15] },
];

const categoryColors = [
  "var(--chart-violet)",
  "var(--chart-amber)",
  "var(--chart-emerald)",
  "var(--chart-rose)",
  "var(--chart-slate)",
];

/* ── Component ──────────────────────────────────────────────────── */

type Range = "today" | "7d" | "30d";

export default function ScreenTimePage() {
  const [range, setRange] = useState<Range>("7d");
  const [search, setSearch] = useState("");

  const filteredApps = appUsage.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.process.toLowerCase().includes(search.toLowerCase()),
  );

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    flat: Minus,
  };

  const trendColor = {
    up: "text-success",
    down: "text-error",
    flat: "text-content-tertiary",
  };

  return (
    <div>
      <Header
        title="Screen Time"
        subtitle="Track your application usage"
        actions={
          <SegmentControl
            options={[
              { value: "today" as Range, label: "Today" },
              { value: "7d" as Range, label: "7 Days" },
              { value: "30d" as Range, label: "30 Days" },
            ]}
            value={range}
            onChange={setRange}
          />
        }
      />

      {/* Stacked Bar Chart */}
      <Card className="mb-sp-8">
        <div className="flex items-center justify-between mb-sp-5">
          <h3 className="text-label-lg text-content-primary">Weekly Overview</h3>
          <div className="flex items-center gap-sp-4">
            {["Development", "Browsing", "Productivity", "Comm.", "Other"].map(
              (label, i) => (
                <div key={label} className="flex items-center gap-sp-1">
                  <span className="dot" style={{ backgroundColor: categoryColors[i] }} />
                  <span className="text-tiny text-content-tertiary">{label}</span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="flex items-end gap-sp-4 h-[220px]">
          {weeklyData.map((day) => {
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-sp-1">
                <div className="w-full flex flex-col-reverse rounded-t overflow-hidden">
                  {day.hours.map((val, i) => (
                    <div
                      key={i}
                      className="w-full transition-all duration-normal"
                      style={{
                        height: `${val * 2}px`,
                        backgroundColor: categoryColors[i],
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
                <span className="text-tiny tabular-nums text-content-tertiary mt-sp-1">
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* App Usage Table */}
      <div>
        <div className="flex items-center justify-between mb-sp-4">
          <h3 className="text-label-lg text-content-primary">Applications</h3>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-sp-3 top-1/2 -translate-y-1/2 text-content-tertiary"
            />
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-sp-8 pr-sp-3 rounded-md border border-border bg-surface-primary text-body-sm text-content-primary placeholder:text-content-quaternary focus:border-accent focus:outline-none transition-colors duration-fast"
            />
          </div>
        </div>

        <Card padding="none">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_140px_100px_100px_48px] gap-sp-4 px-sp-5 py-sp-3 border-b border-border bg-surface-secondary text-label-sm text-content-tertiary">
            <span>Application</span>
            <span>Category</span>
            <span className="text-right">Today</span>
            <span className="text-right">This Week</span>
            <span className="text-right">Trend</span>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border-subtle">
            {filteredApps.map((app) => {
              const Icon = TrendIcon[app.trend];
              return (
                <div
                  key={app.id}
                  className="grid grid-cols-[1fr_140px_100px_100px_48px] gap-sp-4 items-center px-sp-5 py-sp-3 hover:bg-surface-hover transition-colors duration-instant cursor-pointer"
                >
                  <div className="flex items-center gap-sp-3 min-w-0">
                    <div className="h-8 w-8 rounded-md bg-surface-tertiary flex items-center justify-center shrink-0">
                      <span className="text-label-sm text-content-secondary">
                        {app.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-label text-content-primary truncate">{app.name}</p>
                      <p className="text-tiny text-content-tertiary font-mono truncate">
                        {app.process}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-sp-2">
                    <span className="dot" style={{ backgroundColor: app.categoryColor }} />
                    <span className="text-body-sm text-content-secondary">{app.category}</span>
                  </div>

                  <span className="text-body-sm tabular-nums text-content-primary font-mono text-right">
                    {app.today}
                  </span>

                  <span className="text-body-sm tabular-nums text-content-secondary font-mono text-right">
                    {app.week}
                  </span>

                  <div className="flex justify-end">
                    <Icon size={14} className={trendColor[app.trend]} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
