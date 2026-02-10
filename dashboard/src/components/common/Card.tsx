import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-sp-3",
  md: "p-sp-5",
  lg: "p-sp-6",
};

export default function Card({
  children,
  className,
  hoverable = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-border bg-surface-primary",
        paddingMap[padding],
        hoverable && "card-hover cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}
