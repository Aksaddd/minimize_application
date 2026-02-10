import { clsx } from "clsx";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
}: ToggleProps) {
  return (
    <label
      className={clsx(
        "inline-flex items-center gap-sp-3 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          "relative inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full transition-colors duration-normal",
          checked ? "bg-accent" : "bg-surface-tertiary",
        )}
      >
        <span
          className={clsx(
            "inline-block h-[18px] w-[18px] rounded-full bg-surface-primary shadow-xs transition-transform duration-normal ease-ease-spring",
            checked ? "translate-x-[20px]" : "translate-x-[2px]",
          )}
        />
      </button>
      {label && (
        <span className="text-body text-content-primary">{label}</span>
      )}
    </label>
  );
}
