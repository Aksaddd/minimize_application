import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-sp-16 text-center">
      <div className="mb-sp-4 rounded-xl bg-surface-secondary p-sp-4">
        <Icon size={32} strokeWidth={1.25} className="text-content-quaternary" />
      </div>
      <h3 className="text-heading-4 text-content-primary mb-sp-2">{title}</h3>
      <p className="text-body-sm text-content-secondary max-w-sm mb-sp-6">
        {description}
      </p>
      {action}
    </div>
  );
}
