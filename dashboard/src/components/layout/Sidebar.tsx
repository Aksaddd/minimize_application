import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  CalendarClock,
  Grid3x3,
  Settings,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/screen-time", label: "Screen Time", icon: Clock },
  { path: "/schedules", label: "Schedules", icon: CalendarClock },
  { path: "/categories", label: "Categories", icon: Grid3x3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-sidebar border-r border-border bg-surface-primary h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="px-sp-5 py-sp-5 border-b border-border-subtle">
        <div className="flex items-center gap-sp-3">
          <div className="h-7 w-7 rounded-md bg-fill-contrast flex items-center justify-center">
            <span className="text-label-sm text-content-inverted font-semibold">M</span>
          </div>
          <div>
            <h1 className="text-label-lg text-content-primary leading-none">
              Minimize
            </h1>
            <p className="text-tiny text-content-tertiary mt-0.5">
              Application Manager
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-sp-3 py-sp-4 space-y-sp-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-sp-3 px-sp-3 h-9 rounded-md text-label transition-colors duration-fast",
                  isActive
                    ? "bg-surface-tertiary text-content-primary"
                    : "text-content-secondary hover:bg-surface-hover hover:text-content-primary",
                )
              }
            >
              <Icon size={16} strokeWidth={1.5} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="px-sp-4 py-sp-4 border-t border-border-subtle">
        <div className="flex items-center gap-sp-2">
          <span className="dot bg-success animate-pulse" />
          <div className="min-w-0 flex-1">
            <p className="text-caption text-content-secondary truncate">
              Tracking Active
            </p>
            <p className="text-tiny text-content-tertiary font-mono truncate">
              Chrome — 2m 34s
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
