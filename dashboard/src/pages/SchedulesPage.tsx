import Header from "../components/layout/Header";

export default function SchedulesPage() {
  // TODO: Fetch schedules from /api/schedules
  // TODO: Add/edit/delete schedule modal state

  return (
    <div>
      <Header
        title="Schedules"
        subtitle="Manage automatic minimization rules"
        actions={
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
            Add Rule
          </button>
        }
      />

      {/* Schedule list */}
      <div className="space-y-3">
        {/* TODO: ScheduleList component */}
        {/* Each item shows: app name, rule type, config details, toggle switch */}
      </div>

      {/* TODO: ScheduleForm modal for add/edit */}
    </div>
  );
}
