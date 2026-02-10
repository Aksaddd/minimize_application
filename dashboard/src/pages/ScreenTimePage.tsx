import Header from "../components/layout/Header";

export default function ScreenTimePage() {
  // TODO: Date range selector state
  // TODO: Fetch usage data for selected range
  // TODO: Fetch category breakdown

  return (
    <div>
      <Header
        title="Screen Time"
        subtitle="Track your application usage"
        actions={
          <div>{/* TODO: Date range selector */}</div>
        }
      />

      {/* Daily stacked bar chart */}
      <div className="mb-8">
        {/* TODO: DailyBarChart showing usage by category per day */}
      </div>

      {/* App usage table */}
      <div>
        {/* TODO: Sortable table with columns: Icon, Name, Category, Today, This Week, Trend */}
      </div>
    </div>
  );
}
