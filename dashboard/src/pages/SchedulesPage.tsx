import { useState } from "react";
import { Plus, Pencil, Trash2, CalendarClock } from "lucide-react";
import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Toggle from "../components/common/Toggle";
import Modal from "../components/common/Modal";
import EmptyState from "../components/common/EmptyState";
import SegmentControl from "../components/common/SegmentControl";
import { clsx } from "clsx";

/* ── Mock data ──────────────────────────────────────────────────── */

const mockSchedules = [
  {
    id: 1,
    app: "Notion.exe",
    type: "idle" as const,
    description: "Minimize after 5 minutes idle",
    tags: ["Idle", "5 min", "Process"],
    enabled: true,
  },
  {
    id: 2,
    app: "Chrome",
    type: "time_based" as const,
    description: "Minimize Mon-Fri 9:00 AM - 5:00 PM",
    tags: ["Scheduled", "9AM - 5PM", "Title"],
    enabled: true,
  },
  {
    id: 3,
    app: "Discord.exe",
    type: "always" as const,
    description: "Always minimize when opened",
    tags: ["Always", "Process"],
    enabled: false,
  },
];

type ScheduleType = "idle" | "time_based" | "always";

/* ── Component ──────────────────────────────────────────────────── */

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [showModal, setShowModal] = useState(false);
  const [ruleType, setRuleType] = useState<ScheduleType>("idle");

  const enabledCount = schedules.filter((s) => s.enabled).length;

  const handleToggle = (id: number) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  return (
    <div>
      <Header
        title="Schedules"
        subtitle={`${enabledCount} active rule${enabledCount !== 1 ? "s" : ""}`}
        actions={
          <Button
            variant="primary"
            size="md"
            icon={<Plus size={16} />}
            onClick={() => setShowModal(true)}
          >
            Add Rule
          </Button>
        }
      />

      {schedules.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No minimize rules yet"
          description="Create your first rule to automatically minimize applications based on idle time, a schedule, or always."
          action={
            <Button
              variant="primary"
              icon={<Plus size={16} />}
              onClick={() => setShowModal(true)}
            >
              Add Rule
            </Button>
          }
        />
      ) : (
        <div className="space-y-sp-3">
          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              padding="none"
              className={clsx(
                "overflow-hidden",
                !schedule.enabled && "opacity-60",
              )}
            >
              <div className="flex">
                {/* Accent left border */}
                <div
                  className={clsx(
                    "w-[3px] shrink-0",
                    schedule.enabled ? "bg-accent" : "bg-border",
                  )}
                />

                <div className="flex-1 flex items-center justify-between px-sp-5 py-sp-4">
                  <div>
                    <p className="text-label-lg text-content-primary font-mono">
                      {schedule.app}
                    </p>
                    <p className="text-body-sm text-content-secondary mt-sp-1">
                      {schedule.description}
                    </p>
                    <div className="flex items-center gap-sp-2 mt-sp-3">
                      {schedule.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-sp-4">
                    <div className="flex items-center gap-sp-1">
                      <Button variant="ghost" size="sm">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <Toggle
                      checked={schedule.enabled}
                      onChange={() => handleToggle(schedule.id)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Rule Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Minimize Rule"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Create Rule
            </Button>
          </>
        }
      >
        <div className="space-y-sp-5">
          {/* Application */}
          <div>
            <label className="text-label-sm text-content-secondary mb-sp-2 block">
              Application
            </label>
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full h-9 px-sp-3 rounded-md border border-border bg-surface-primary text-body text-content-primary placeholder:text-content-quaternary focus:border-accent focus:outline-none transition-colors duration-fast"
            />
          </div>

          {/* Rule Type */}
          <div>
            <label className="text-label-sm text-content-secondary mb-sp-2 block">
              Rule Type
            </label>
            <SegmentControl
              options={[
                { value: "idle" as ScheduleType, label: "Idle" },
                { value: "time_based" as ScheduleType, label: "Time-based" },
                { value: "always" as ScheduleType, label: "Always" },
              ]}
              value={ruleType}
              onChange={setRuleType}
            />
          </div>

          {/* Conditional fields */}
          {ruleType === "idle" && (
            <div>
              <label className="text-label-sm text-content-secondary mb-sp-2 block">
                Idle Threshold
              </label>
              <div className="flex items-center gap-sp-4">
                <input
                  type="range"
                  min="30"
                  max="3600"
                  defaultValue="300"
                  className="flex-1 accent-accent"
                />
                <span className="text-label tabular-nums text-content-primary font-mono w-16 text-right">
                  5 min
                </span>
              </div>
              <div className="flex justify-between mt-sp-1">
                <span className="text-tiny text-content-quaternary">30s</span>
                <span className="text-tiny text-content-quaternary">60 min</span>
              </div>
            </div>
          )}

          {ruleType === "time_based" && (
            <div className="grid grid-cols-2 gap-sp-4">
              <div>
                <label className="text-label-sm text-content-secondary mb-sp-2 block">
                  Start Time
                </label>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full h-9 px-sp-3 rounded-md border border-border bg-surface-primary text-body text-content-primary focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="text-label-sm text-content-secondary mb-sp-2 block">
                  End Time
                </label>
                <input
                  type="time"
                  defaultValue="17:00"
                  className="w-full h-9 px-sp-3 rounded-md border border-border bg-surface-primary text-body text-content-primary focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Detection Mode */}
          <div>
            <label className="text-label-sm text-content-secondary mb-sp-2 block">
              Detection Mode
            </label>
            <SegmentControl
              options={[
                { value: "process", label: "Process Name" },
                { value: "title", label: "Window Title" },
              ]}
              value="process"
              onChange={() => {}}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
