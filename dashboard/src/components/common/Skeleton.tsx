import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "full";
}

export default function Skeleton({
  className,
  width,
  height = 16,
  rounded = "md",
}: SkeletonProps) {
  const roundedClass = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={clsx("skeleton", roundedClass, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
