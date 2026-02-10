import { clsx } from "clsx";

interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentControlProps<T>) {
  return (
    <div className="inline-flex h-8 items-center rounded-md border border-border bg-surface-secondary p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={clsx(
            "h-full rounded px-sp-3 text-label-sm transition-all duration-fast",
            value === option.value
              ? "bg-fill-contrast text-content-inverted shadow-xs"
              : "text-content-secondary hover:text-content-primary",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
