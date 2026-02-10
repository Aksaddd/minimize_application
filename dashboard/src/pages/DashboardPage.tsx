import Header from "../components/layout/Header";

export default function DashboardPage() {
  // TODO: Fetch today's overview from /api/screen-time/today
  // TODO: Fetch active schedules from /api/schedules
  // TODO: Fetch live session from /api/screen-time/live

  return (
    <div>
      <Header title="Dashboard" subtitle="Your daily overview" />

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* TODO: Total Screen Time card */}
        {/* TODO: Apps Tracked card */}
        {/* TODO: Most Used App card */}
        {/* TODO: Times Minimized card */}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* TODO: Usage by Category pie chart */}
        {/* TODO: Hourly Activity bar chart */}
      </div>

      {/* Active rules */}
      <div>
        {/* TODO: Active Minimize Rules list */}
      </div>
    </div>
  );
}
