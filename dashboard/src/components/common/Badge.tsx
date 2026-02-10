import { clsx } from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-tertiary text-content-secondary",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  error: "bg-error-subtle text-error",
  accent: "bg-accent-subtle text-accent",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm px-sp-2 py-0.5 text-label-sm",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
