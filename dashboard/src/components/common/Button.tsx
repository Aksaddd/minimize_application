import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-fill-contrast text-content-inverted hover:bg-fill-contrast-hover active:scale-[0.98]",
  secondary:
    "bg-surface-primary text-content-primary border border-border hover:border-border-strong hover:bg-surface-hover active:bg-surface-active",
  ghost:
    "text-content-secondary hover:text-content-primary hover:bg-surface-hover active:bg-surface-active",
  danger:
    "bg-error-subtle text-error border border-error/20 hover:bg-error/10 active:bg-error/15",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-sp-3 text-label-sm gap-sp-1",
  md: "h-9 px-sp-4 text-label gap-sp-2",
  lg: "h-10 px-sp-5 text-label-lg gap-sp-2",
};

export default function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-fast",
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
