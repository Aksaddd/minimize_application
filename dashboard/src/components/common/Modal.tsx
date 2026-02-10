import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { clsx } from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

const widthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = "md",
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-fast"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={clsx(
          "relative w-full rounded-xl border border-border bg-surface-primary shadow-lg animate-fade-in",
          widthClasses[width],
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-sp-6 py-sp-4">
          <h2 className="text-heading-4">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-sp-1 text-content-tertiary hover:text-content-primary hover:bg-surface-hover transition-colors duration-fast"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-sp-6 py-sp-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-sp-3 border-t border-border px-sp-6 py-sp-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
