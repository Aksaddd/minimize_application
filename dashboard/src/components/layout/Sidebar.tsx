import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/screen-time", label: "Screen Time", icon: "Clock" },
  { path: "/schedules", label: "Schedules", icon: "CalendarClock" },
  { path: "/categories", label: "Categories", icon: "FolderOpen" },
  { path: "/settings", label: "Settings", icon: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-600">Minimize</h1>
        <p className="text-xs text-gray-500 mt-1">Application Manager</p>
      </div>
      <nav className="px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`
            }
          >
            {/* TODO: Replace with lucide-react icons */}
            <span className="w-5 h-5 flex items-center justify-center text-xs">
              {item.icon.charAt(0)}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
