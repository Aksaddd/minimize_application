import { clsx } from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: { value: string; direction: "up" | "down" | "flat" };
  sparkline?: number[];
  className?: string;
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 32;
  const padding = 2;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((v - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MetricCard({
  label,
  value,
  trend,
  sparkline,
  className,
}: MetricCardProps) {
  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUp
      : trend?.direction === "down"
        ? TrendingDown
        : Minus;

  const trendColor =
    trend?.direction === "up"
      ? "text-success"
      : trend?.direction === "down"
        ? "text-error"
        : "text-content-tertiary";

  return (
    <div className={clsx("card card-hover", className)}>
      <div className="flex items-center justify-between mb-sp-3">
        <span className="text-label-sm text-content-secondary">{label}</span>
        {trend && (
          <span className={clsx("inline-flex items-center gap-1 text-caption", trendColor)}>
            <TrendIcon size={12} />
            {trend.value}
          </span>
        )}
      </div>

      <div className="text-heading-1 tabular-nums text-content-primary mb-sp-3">
        {value}
      </div>

      {sparkline && sparkline.length > 1 && (
        <div className="mt-sp-2">
          <Sparkline data={sparkline} />
        </div>
      )}
    </div>
  );
}
