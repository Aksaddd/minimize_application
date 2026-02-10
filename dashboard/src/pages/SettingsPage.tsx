import Header from "../components/layout/Header";

export default function SettingsPage() {
  // TODO: Fetch settings from /api/settings
  // TODO: Save settings on change

  return (
    <div>
      <Header title="Settings" subtitle="Configure application behavior" />

      <div className="max-w-2xl space-y-8">
        {/* Tracking section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Tracking</h2>
          {/* TODO: Enable/disable tracking toggle */}
          {/* TODO: Polling interval slider */}
        </section>

        {/* Startup section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Startup</h2>
          {/* TODO: Launch on Windows boot toggle */}
          {/* TODO: Start minimized toggle */}
        </section>

        {/* Data section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Data</h2>
          {/* TODO: Data retention period selector */}
          {/* TODO: Export data button (CSV/JSON) */}
          {/* TODO: Clear data button with confirmation */}
        </section>

        {/* Appearance section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          {/* TODO: Theme selector (light/dark/system) */}
        </section>
      </div>
    </div>
  );
}
