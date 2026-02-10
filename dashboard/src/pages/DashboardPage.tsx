import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import MetricCard from "../components/common/MetricCard";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Toggle from "../components/common/Toggle";
import { clsx } from "clsx";

/* ── Mock data (replace with API calls) ────────────────────────── */

const metrics = {
  screenTime: {
    label: "Screen Time",
    value: "6h 42m",
    trend: { value: "12%", direction: "up" as const },
    sparkline: [20, 35, 28, 45, 60, 72, 65, 80, 75, 55, 40, 30],
  },
  appsTracked: {
    label: "Apps Tracked",
    value: "12",
    trend: { value: "2 new", direction: "up" as const },
    sparkline: [8, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12],
  },
  mostUsed: {
    label: "Most Used",
    value: "VS Code",
    trend: { value: "3h 12m", direction: "flat" as const },
    sparkline: [40, 55, 60, 50, 65, 70, 80, 75, 60, 55, 45, 50],
  },
  timesMinimized: {
    label: "Times Minimized",
    value: "47",
    trend: { value: "8%", direction: "down" as const },
    sparkline: [5, 8, 3, 6, 4, 7, 2, 5, 3, 4, 2, 3],
  },
};

const categoryUsage = [
  { name: "Productivity", color: "var(--chart-emerald)", percent: 45, time: "3h 01m" },
  { name: "Development", color: "var(--chart-violet)", percent: 30, time: "2h 01m" },
  { name: "Browsing", color: "var(--chart-amber)", percent: 15, time: "1h 00m" },
  { name: "Communication", color: "var(--chart-rose)", percent: 7, time: "28m" },
  { name: "Entertainment", color: "var(--chart-slate)", percent: 3, time: "12m" },
];

const activeRules = [
  { id: 1, app: "Notion.exe", type: "Idle", config: "5 min", mode: "Process", enabled: true },
  { id: 2, app: "Chrome", type: "Scheduled", config: "9AM - 5PM", mode: "Title", enabled: true },
  { id: 3, app: "Discord.exe", type: "Always", config: "—", mode: "Process", enabled: false },
];

/* ── Component ──────────────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard" subtitle="Your daily overview" />

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-sp-6 mb-sp-8">
        <MetricCard {...metrics.screenTime} />
        <MetricCard {...metrics.appsTracked} />
        <MetricCard {...metrics.mostUsed} />
        <MetricCard {...metrics.timesMinimized} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-sp-6 mb-sp-8">
        {/* Usage by Category */}
        <Card>
          <div className="flex items-center justify-between mb-sp-5">
            <h3 className="text-label-lg text-content-primary">Usage by Category</h3>
            <span className="text-caption text-content-tertiary">Today</span>
          </div>

          {/* Donut chart placeholder */}
          <div className="flex items-center justify-center h-[180px] mb-sp-5">
            <div className="relative h-[160px] w-[160px]">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0;
                  return categoryUsage.map((cat) => {
                    const dash = cat.percent;
                    const gap = 100 - dash;
                    const currentOffset = offset;
                    offset += dash;
                    return (
                      <circle
                        key={cat.name}
                        cx="18" cy="18" r="15.9"
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="3"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-currentOffset}
                        strokeLinecap="round"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-heading-3 tabular-nums text-content-primary">6h 42m</span>
                <span className="text-tiny text-content-tertiary">total</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-sp-2">
            {categoryUsage.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-sp-2">
                  <span className="dot" style={{ backgroundColor: cat.color }} />
                  <span className="text-body-sm text-content-secondary">{cat.name}</span>
                </div>
                <div className="flex items-center gap-sp-3">
                  <span className="text-body-sm tabular-nums text-content-primary font-mono">
                    {cat.time}
                  </span>
                  <span className="text-caption tabular-nums text-content-tertiary w-8 text-right">
                    {cat.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Hourly Activity */}
        <Card>
          <div className="flex items-center justify-between mb-sp-5">
            <h3 className="text-label-lg text-content-primary">Today's Timeline</h3>
            <span className="text-caption text-content-tertiary">Hourly breakdown</span>
          </div>

          {/* Bar chart placeholder */}
          <div className="flex items-end gap-[3px] h-[200px] pt-sp-4">
            {[20, 45, 70, 85, 60, 35, 90, 75, 55, 40, 65, 50, 30, 15, 0, 0].map(
              (val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-sp-1">
                  <div
                    className="w-full rounded-t transition-all duration-normal"
                    style={{
                      height: `${val * 1.6}px`,
                      backgroundColor: val > 0 ? "var(--accent)" : "var(--bg-tertiary)",
                      opacity: val > 0 ? 0.2 + (val / 100) * 0.8 : 1,
                    }}
                  />
                  <span className="text-tiny tabular-nums text-content-quaternary">
                    {i + 8 > 12 ? `${i + 8 - 12}p` : `${i + 8}a`}
                  </span>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>

      {/* Active Rules */}
      <div>
        <div className="flex items-center justify-between mb-sp-4">
          <h3 className="text-label-lg text-content-primary">Active Rules</h3>
          <Link
            to="/schedules"
            className="flex items-center gap-sp-1 text-caption text-content-secondary hover:text-content-primary transition-colors duration-fast"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <Card padding="none">
          <div className="divide-y divide-border-subtle">
            {activeRules.map((rule) => (
              <div
                key={rule.id}
                className={clsx(
                  "flex items-center justify-between px-sp-5 py-sp-4",
                  !rule.enabled && "opacity-50",
                )}
              >
                <div className="flex items-center gap-sp-4">
                  {/* Accent bar for enabled rules */}
                  <div
                    className={clsx(
                      "w-0.5 h-8 rounded-full",
                      rule.enabled ? "bg-accent" : "bg-border",
                    )}
                  />
                  <div>
                    <p className="text-label text-content-primary font-mono">{rule.app}</p>
                    <div className="flex items-center gap-sp-2 mt-sp-1">
                      <Badge>{rule.type}</Badge>
                      <Badge>{rule.config}</Badge>
                      <Badge>{rule.mode}</Badge>
                    </div>
                  </div>
                </div>
                <Toggle checked={rule.enabled} onChange={() => {}} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
