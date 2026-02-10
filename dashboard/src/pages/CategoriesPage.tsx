import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { clsx } from "clsx";

/* ── Mock data ──────────────────────────────────────────────────── */

const mockCategories = [
  {
    id: 1,
    name: "Productivity",
    color: "var(--chart-emerald)",
    appCount: 3,
    todayTime: "4h 22m",
    percent: 62,
  },
  {
    id: 2,
    name: "Development",
    color: "var(--chart-violet)",
    appCount: 2,
    todayTime: "3h 12m",
    percent: 45,
  },
  {
    id: 3,
    name: "Browsing",
    color: "var(--chart-amber)",
    appCount: 2,
    todayTime: "1h 48m",
    percent: 25,
  },
  {
    id: 4,
    name: "Communication",
    color: "var(--chart-rose)",
    appCount: 2,
    todayTime: "45m",
    percent: 10,
  },
  {
    id: 5,
    name: "Entertainment",
    color: "var(--chart-cyan)",
    appCount: 1,
    todayTime: "22m",
    percent: 5,
  },
];

const uncategorizedApps = [
  { id: 10, name: "TaskManager.exe", lastSeen: "2 min ago" },
  { id: 11, name: "Calculator.exe", lastSeen: "1 hour ago" },
];

/* ── Component ──────────────────────────────────────────────────── */

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const [newColor, setNewColor] = useState("var(--chart-blue)");

  const colorOptions = [
    { value: "var(--chart-blue)", hex: "#0070f3" },
    { value: "var(--chart-violet)", hex: "#7928ca" },
    { value: "var(--chart-cyan)", hex: "#00b4d8" },
    { value: "var(--chart-rose)", hex: "#e11d48" },
    { value: "var(--chart-amber)", hex: "#d97706" },
    { value: "var(--chart-emerald)", hex: "#059669" },
    { value: "var(--chart-orange)", hex: "#ea580c" },
    { value: "var(--chart-slate)", hex: "#475569" },
  ];

  return (
    <div>
      <Header
        title="Categories"
        subtitle="Organize applications into custom groups"
        actions={
          <Button
            variant="primary"
            size="md"
            icon={<Plus size={16} />}
            onClick={() => setShowModal(true)}
          >
            New Category
          </Button>
        }
      />

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-6 mb-sp-10">
        {mockCategories.map((cat) => (
          <Card key={cat.id} hoverable className="relative overflow-hidden cursor-pointer">
            {/* Top color accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: cat.color }}
            />

            <div className="flex items-center justify-between mb-sp-4">
              <div className="flex items-center gap-sp-2">
                <span className="dot" style={{ backgroundColor: cat.color }} />
                <span className="text-label-lg text-content-primary">{cat.name}</span>
              </div>
              <div className="flex items-center gap-sp-1 text-content-tertiary">
                <span className="text-caption">{cat.appCount} app{cat.appCount !== 1 ? "s" : ""}</span>
                <ChevronRight size={14} />
              </div>
            </div>

            <div className="mb-sp-1">
              <span className="text-heading-3 tabular-nums text-content-primary">
                {cat.todayTime}
              </span>
            </div>
            <span className="text-caption text-content-tertiary">today</span>

            {/* Progress bar */}
            <div className="mt-sp-4">
              <div className="h-1.5 w-full rounded-full bg-surface-tertiary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-slow"
                  style={{
                    width: `${cat.percent}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
              <span className="text-caption tabular-nums text-content-tertiary mt-sp-1 block">
                {cat.percent}% of total
              </span>
            </div>
          </Card>
        ))}

        {/* New Category card */}
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg border border-dashed border-border hover:border-border-strong flex flex-col items-center justify-center py-sp-12 transition-colors duration-fast cursor-pointer"
        >
          <div className="rounded-lg bg-surface-secondary p-sp-3 mb-sp-3">
            <Plus size={20} strokeWidth={1.5} className="text-content-tertiary" />
          </div>
          <span className="text-label text-content-secondary">New Category</span>
        </button>
      </div>

      {/* Uncategorized */}
      {uncategorizedApps.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-sp-4">
            <h3 className="text-label-lg text-content-primary">Uncategorized</h3>
            <span className="text-caption text-content-tertiary">
              {uncategorizedApps.length} app{uncategorizedApps.length !== 1 ? "s" : ""}
            </span>
          </div>

          <Card padding="none">
            <div className="divide-y divide-border-subtle">
              {uncategorizedApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between px-sp-5 py-sp-3"
                >
                  <div className="flex items-center gap-sp-3">
                    <div className="h-8 w-8 rounded-md bg-surface-tertiary flex items-center justify-center">
                      <span className="text-label-sm text-content-tertiary">
                        {app.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-label text-content-primary font-mono">{app.name}</p>
                      <p className="text-tiny text-content-tertiary">{app.lastSeen}</p>
                    </div>
                  </div>

                  <select className="h-8 px-sp-3 rounded-md border border-border bg-surface-primary text-body-sm text-content-secondary focus:border-accent focus:outline-none cursor-pointer">
                    <option value="">Assign to category...</option>
                    {mockCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* New Category Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New Category"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-sp-5">
          <div>
            <label className="text-label-sm text-content-secondary mb-sp-2 block">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Design Tools"
              className="w-full h-9 px-sp-3 rounded-md border border-border bg-surface-primary text-body text-content-primary placeholder:text-content-quaternary focus:border-accent focus:outline-none transition-colors duration-fast"
            />
          </div>

          <div>
            <label className="text-label-sm text-content-secondary mb-sp-2 block">
              Color
            </label>
            <div className="flex gap-sp-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.hex}
                  onClick={() => setNewColor(opt.value)}
                  className={clsx(
                    "h-8 w-8 rounded-full transition-all duration-fast",
                    newColor === opt.value
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-surface-primary scale-110"
                      : "hover:scale-105",
                  )}
                  style={{ backgroundColor: opt.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
