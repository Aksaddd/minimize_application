import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Toggle from "../components/common/Toggle";
import SegmentControl from "../components/common/SegmentControl";

/* ── Component ──────────────────────────────────────────────────── */

type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [pollingInterval, setPollingInterval] = useState(5);
  const [launchOnBoot, setLaunchOnBoot] = useState(false);
  const [startMinimized, setStartMinimized] = useState(false);
  const [retentionDays, setRetentionDays] = useState("90");
  const [theme, setTheme] = useState<Theme>("system");

  return (
    <div>
      <Header title="Settings" subtitle="Configure application behavior" />

      <div className="max-w-[640px] space-y-sp-6">
        {/* Tracking */}
        <Card>
          <h2 className="text-heading-4 text-content-primary mb-sp-5">Tracking</h2>

          <div className="space-y-sp-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label text-content-primary">
                  Enable screen time tracking
                </p>
                <p className="text-caption text-content-tertiary mt-sp-1">
                  Record which application is in the foreground
                </p>
              </div>
              <Toggle checked={trackingEnabled} onChange={setTrackingEnabled} />
            </div>

            <div className="border-t border-border-subtle pt-sp-5">
              <div className="flex items-center justify-between mb-sp-3">
                <div>
                  <p className="text-label text-content-primary">Polling interval</p>
                  <p className="text-caption text-content-tertiary mt-sp-1">
                    How often to check the foreground window
                  </p>
                </div>
                <span className="text-label tabular-nums text-content-primary font-mono">
                  {pollingInterval}s
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pollingInterval}
                onChange={(e) => setPollingInterval(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between mt-sp-1">
                <span className="text-tiny text-content-quaternary">1s</span>
                <span className="text-tiny text-content-quaternary">30s</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Startup */}
        <Card>
          <h2 className="text-heading-4 text-content-primary mb-sp-5">Startup</h2>

          <div className="space-y-sp-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label text-content-primary">
                  Launch on system boot
                </p>
                <p className="text-caption text-content-tertiary mt-sp-1">
                  Start Minimize when Windows starts
                </p>
              </div>
              <Toggle checked={launchOnBoot} onChange={setLaunchOnBoot} />
            </div>

            <div className="border-t border-border-subtle pt-sp-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-label text-content-primary">
                    Start minimized to tray
                  </p>
                  <p className="text-caption text-content-tertiary mt-sp-1">
                    Launch in the background without showing the dashboard
                  </p>
                </div>
                <Toggle checked={startMinimized} onChange={setStartMinimized} />
              </div>
            </div>
          </div>
        </Card>

        {/* Data */}
        <Card>
          <h2 className="text-heading-4 text-content-primary mb-sp-5">Data</h2>

          <div className="space-y-sp-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label text-content-primary">Keep data for</p>
                <p className="text-caption text-content-tertiary mt-sp-1">
                  Older data will be automatically deleted
                </p>
              </div>
              <select
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                className="h-8 px-sp-3 rounded-md border border-border bg-surface-primary text-body-sm text-content-primary focus:border-accent focus:outline-none cursor-pointer"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="0">Forever</option>
              </select>
            </div>

            <div className="border-t border-border-subtle pt-sp-5">
              <p className="text-label text-content-primary mb-sp-3">Export data</p>
              <div className="flex gap-sp-3">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Download size={14} />}
                >
                  Export CSV
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Download size={14} />}
                >
                  Export JSON
                </Button>
              </div>
            </div>

            <div className="border-t border-border-subtle pt-sp-5">
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={14} />}
              >
                Clear All Data
              </Button>
              <p className="text-tiny text-content-tertiary mt-sp-2">
                This action cannot be undone. All tracking history will be
                permanently deleted.
              </p>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <h2 className="text-heading-4 text-content-primary mb-sp-5">
            Appearance
          </h2>

          <div>
            <p className="text-label text-content-primary mb-sp-3">Theme</p>
            <SegmentControl
              options={[
                { value: "light" as Theme, label: "Light" },
                { value: "dark" as Theme, label: "Dark" },
                { value: "system" as Theme, label: "System" },
              ]}
              value={theme}
              onChange={setTheme}
            />
            <p className="text-caption text-content-tertiary mt-sp-2">
              {theme === "system"
                ? "Follows your operating system preference"
                : `Always use ${theme} mode`}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
