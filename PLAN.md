# Minimize Application Dashboard - Architectural Plan

## Executive Summary

Transform the existing idle-application-minimizer utility into a full-featured
desktop productivity platform with a web-based dashboard. The system will give
users control over automatic window minimization schedules, real-time screen
time analytics, and custom application categorization to build personal usage
profiles.

---

## 1. Current State Assessment

### What exists today
- Two Python scripts that minimize windows based on idle detection
- Process-level targeting (`minimize_by_process.pyw`) and title-level targeting
  (`minimize_by_title.py`)
- Hardcoded configuration (target apps, thresholds) edited in source code
- No persistence, no UI, no analytics, no user-facing configuration
- Windows-only, using ctypes/pywinauto/psutil

### Gaps to fill
| Gap | Priority |
|-----|----------|
| No dashboard or UI | P0 |
| No data persistence / database | P0 |
| No screen time tracking | P0 |
| No schedule-based minimization (only idle-based) | P0 |
| No application categorization system | P1 |
| No usage analytics or reporting | P1 |
| Hardcoded config requires code edits | P1 |
| No system tray / background service management | P2 |

---

## 2. System Architecture

```
+------------------------------------------------------------------+
|                        FRONTEND (Dashboard)                       |
|                     Electron + React + Vite                       |
|                                                                   |
|  +-------------+  +-------------+  +-------------+  +----------+ |
|  | Schedule     |  | Screen Time |  | Categories  |  | Settings | |
|  | Manager      |  | Analytics   |  | Manager     |  | Panel    | |
|  +-------------+  +-------------+  +-------------+  +----------+ |
+------------------------------------------------------------------+
          |                    |                    |
          |         REST API / IPC Bridge           |
          |                    |                    |
+------------------------------------------------------------------+
|                      BACKEND (Python)                             |
|                   FastAPI + SQLite + APScheduler                  |
|                                                                   |
|  +---------------+  +--------------+  +------------------------+ |
|  | Minimizer     |  | Screen Time  |  | Category & Profile     | |
|  | Engine        |  | Tracker      |  | Service                | |
|  | (existing +   |  | Service      |  |                        | |
|  |  scheduler)   |  |              |  |                        | |
|  +---------------+  +--------------+  +------------------------+ |
|         |                  |                     |                |
|  +------------------------------------------------------------+  |
|  |                    SQLite Database                           | |
|  |  schedules | screen_time | apps | categories | user_config  | |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
          |
+------------------------------------------------------------------+
|                     WINDOWS OS LAYER                              |
|  ctypes (idle detection) | psutil (process enum) | pywinauto     |
+------------------------------------------------------------------+
```

### Technology choices and rationale

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend API** | FastAPI (Python) | Same language as existing scripts; async support; auto-generated API docs; lightweight |
| **Database** | SQLite | Zero-config; file-based; sufficient for single-user desktop app; no external server |
| **ORM** | SQLAlchemy 2.0 | Mature, well-documented, works seamlessly with SQLite and FastAPI |
| **Task Scheduler** | APScheduler | Python-native; cron-like scheduling for minimize rules; integrates with asyncio |
| **Screen Time Collector** | psutil + custom polling | Already a dependency; can enumerate foreground windows at intervals |
| **Frontend** | Electron + React + Vite | Cross-platform desktop shell; React for component-driven UI; Vite for fast dev |
| **Charts** | Recharts | Lightweight React charting library; good for time-series and pie charts |
| **System Tray** | pystray | Python system tray icon for background service control |

---

## 3. Data Models & Database Schema

### 3.1 `applications` - Discovered and tracked applications

```sql
CREATE TABLE applications (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    process_name  TEXT NOT NULL,              -- e.g. "Notion.exe"
    display_name  TEXT,                       -- e.g. "Notion" (user-editable)
    icon_path     TEXT,                       -- cached icon file path
    category_id   INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    first_seen    DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_hidden     BOOLEAN DEFAULT 0,          -- user can hide apps they don't care about
    UNIQUE(process_name)
);
```

### 3.2 `categories` - User-defined application categories

```sql
CREATE TABLE categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL UNIQUE,         -- e.g. "Productivity", "Social Media"
    color       TEXT DEFAULT '#6366f1',       -- hex color for charts
    icon        TEXT DEFAULT 'folder',        -- icon identifier
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed defaults (user can rename/delete)
INSERT INTO categories (name, color, icon) VALUES
    ('Productivity',   '#22c55e', 'briefcase'),
    ('Communication',  '#3b82f6', 'message-circle'),
    ('Entertainment',  '#ef4444', 'play-circle'),
    ('Development',    '#a855f7', 'code'),
    ('Browsing',       '#f59e0b', 'globe'),
    ('Uncategorized',  '#6b7280', 'folder');
```

### 3.3 `minimize_schedules` - Rules for automatic minimization

```sql
CREATE TABLE minimize_schedules (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id          INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    schedule_type   TEXT NOT NULL CHECK(schedule_type IN ('idle', 'time_based', 'always')),
    -- For idle-based rules
    idle_threshold_seconds  INTEGER,          -- minimize after N seconds idle
    -- For time-based rules
    start_time      TEXT,                     -- HH:MM format, e.g. "09:00"
    end_time        TEXT,                     -- HH:MM format, e.g. "17:00"
    days_of_week    TEXT,                     -- comma-separated: "mon,tue,wed,thu,fri"
    -- Common
    is_enabled      BOOLEAN DEFAULT 1,
    detection_mode  TEXT DEFAULT 'process' CHECK(detection_mode IN ('process', 'title')),
    title_pattern   TEXT,                     -- for title-based detection
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3.4 `screen_time_events` - Raw tracking data

```sql
CREATE TABLE screen_time_events (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id          INTEGER NOT NULL REFERENCES applications(id),
    window_title    TEXT,
    started_at      DATETIME NOT NULL,
    ended_at        DATETIME,
    duration_seconds INTEGER GENERATED ALWAYS AS
        (CAST((julianday(ended_at) - julianday(started_at)) * 86400 AS INTEGER)) STORED,
    was_foreground  BOOLEAN DEFAULT 1
);

-- Index for fast date-range queries
CREATE INDEX idx_screen_time_date ON screen_time_events(started_at);
CREATE INDEX idx_screen_time_app  ON screen_time_events(app_id);
```

### 3.5 `daily_summaries` - Aggregated daily stats (materialized for performance)

```sql
CREATE TABLE daily_summaries (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id          INTEGER NOT NULL REFERENCES applications(id),
    date            DATE NOT NULL,
    total_seconds   INTEGER DEFAULT 0,
    session_count   INTEGER DEFAULT 0,
    UNIQUE(app_id, date)
);
```

### 3.6 `user_settings` - Application configuration

```sql
CREATE TABLE user_settings (
    key     TEXT PRIMARY KEY,
    value   TEXT NOT NULL
);

-- Defaults
INSERT INTO user_settings (key, value) VALUES
    ('tracking_enabled',       'true'),
    ('tracking_interval_ms',   '5000'),
    ('minimize_on_startup',    'false'),
    ('start_with_windows',     'false'),
    ('theme',                  'system'),
    ('data_retention_days',    '90');
```

---

## 4. Backend Services

### 4.1 Project structure

```
backend/
├── main.py                     # FastAPI app entry, lifespan events
├── config.py                   # Settings, paths, constants
├── database.py                 # SQLAlchemy engine, session factory
├── models/
│   ├── __init__.py
│   ├── application.py          # Application ORM model
│   ├── category.py             # Category ORM model
│   ├── schedule.py             # MinimizeSchedule ORM model
│   ├── screen_time.py          # ScreenTimeEvent, DailySummary models
│   └── settings.py             # UserSettings model
├── schemas/
│   ├── __init__.py
│   ├── application.py          # Pydantic request/response schemas
│   ├── category.py
│   ├── schedule.py
│   ├── screen_time.py
│   └── settings.py
├── routers/
│   ├── __init__.py
│   ├── applications.py         # CRUD for applications
│   ├── categories.py           # CRUD for categories
│   ├── schedules.py            # CRUD for minimize schedules
│   ├── screen_time.py          # Screen time queries and analytics
│   └── settings.py             # User settings endpoints
├── services/
│   ├── __init__.py
│   ├── minimizer_engine.py     # Refactored minimize logic (from existing scripts)
│   ├── screen_time_tracker.py  # Foreground window polling service
│   ├── scheduler_service.py    # APScheduler integration for time-based rules
│   ├── app_discovery.py        # Auto-detect running applications
│   └── aggregation.py          # Daily summary computation
└── utils/
    ├── __init__.py
    ├── windows_api.py          # ctypes wrappers (idle detection, window enum)
    └── icon_extractor.py       # Extract app icons for the dashboard
```

### 4.2 Core services

#### Screen Time Tracker (`services/screen_time_tracker.py`)

Runs as a background thread/task. Every N seconds (default 5):
1. Call `GetForegroundWindow()` via ctypes to get the active window handle
2. Resolve the window handle to a process via `GetWindowThreadProcessId()`
3. Look up the process name via `psutil.Process(pid).name()`
4. If the foreground app changed since last poll:
   - Close the previous `screen_time_event` record (set `ended_at`)
   - Open a new record for the new foreground app
5. Auto-register unknown applications into the `applications` table

#### Minimizer Engine (`services/minimizer_engine.py`)

Refactor existing scripts into a single configurable engine:
- Load active schedules from the database
- Support three modes:
  - **idle**: existing behavior (minimize after N seconds idle)
  - **time_based**: minimize during specific time windows (e.g., block social media 9-5)
  - **always**: keep app minimized whenever it opens
- Hot-reload schedules when the user changes them via the dashboard

#### Scheduler Service (`services/scheduler_service.py`)

- Uses APScheduler to manage time-based minimize rules
- When a time-based schedule activates, it instructs the minimizer engine to
  start enforcing that rule
- When the schedule window ends, the rule is deactivated

### 4.3 API Endpoints

#### Applications
```
GET    /api/applications              # List all tracked apps (with category, stats)
GET    /api/applications/:id          # Get single app details
PATCH  /api/applications/:id          # Update display name, category, hidden status
GET    /api/applications/running      # List currently running applications
```

#### Categories
```
GET    /api/categories                # List all categories with app counts
POST   /api/categories                # Create new category
PATCH  /api/categories/:id            # Update category name, color, icon
DELETE /api/categories/:id            # Delete category (apps become uncategorized)
GET    /api/categories/:id/apps       # List apps in a category
PATCH  /api/categories/:id/apps       # Batch-assign apps to a category
```

#### Minimize Schedules
```
GET    /api/schedules                 # List all schedules
POST   /api/schedules                 # Create new minimize rule
PATCH  /api/schedules/:id             # Update rule
DELETE /api/schedules/:id             # Delete rule
PATCH  /api/schedules/:id/toggle      # Enable/disable a rule
```

#### Screen Time
```
GET    /api/screen-time/today         # Today's usage breakdown
GET    /api/screen-time/range         # Usage for date range (?from=&to=)
GET    /api/screen-time/app/:id       # Usage history for specific app
GET    /api/screen-time/by-category   # Usage grouped by category
GET    /api/screen-time/trends        # Weekly/monthly trend data
GET    /api/screen-time/live          # Current session info (what's active now)
```

#### Settings
```
GET    /api/settings                  # Get all settings
PATCH  /api/settings                  # Update settings (partial)
```

---

## 5. Frontend Dashboard

### 5.1 Project structure

```
dashboard/
├── package.json
├── vite.config.ts
├── electron/
│   ├── main.ts                 # Electron main process
│   ├── preload.ts              # IPC bridge
│   └── tray.ts                 # System tray management
├── src/
│   ├── main.tsx                # React entry
│   ├── App.tsx                 # Root layout + routing
│   ├── api/
│   │   └── client.ts           # Axios/fetch wrapper for backend API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── charts/
│   │   │   ├── UsagePieChart.tsx
│   │   │   ├── DailyBarChart.tsx
│   │   │   ├── TrendLineChart.tsx
│   │   │   └── CategoryBreakdown.tsx
│   │   ├── apps/
│   │   │   ├── AppList.tsx
│   │   │   ├── AppCard.tsx
│   │   │   └── AppCategoryAssigner.tsx
│   │   ├── schedules/
│   │   │   ├── ScheduleList.tsx
│   │   │   ├── ScheduleForm.tsx
│   │   │   └── ScheduleToggle.tsx
│   │   └── common/
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       └── TimeRangePicker.tsx
│   ├── pages/
│   │   ├── DashboardPage.tsx       # Overview with key metrics
│   │   ├── ScreenTimePage.tsx      # Detailed screen time analytics
│   │   ├── SchedulesPage.tsx       # Manage minimize rules
│   │   ├── CategoriesPage.tsx      # Manage categories and assign apps
│   │   └── SettingsPage.tsx        # App configuration
│   ├── hooks/
│   │   ├── useScreenTime.ts
│   │   ├── useApplications.ts
│   │   ├── useSchedules.ts
│   │   └── useCategories.ts
│   └── styles/
│       └── globals.css             # Tailwind CSS base
├── tailwind.config.ts
└── tsconfig.json
```

### 5.2 Page Designs

#### Dashboard (Home) Page
```
+-------+---------------------------------------------------+
|       |  Dashboard                          [Today v]      |
|  D    | +-------------------+ +-------------------+       |
|  A    | | Total Screen Time | | Apps Tracked       |       |
|  S    | | 6h 42m           | | 12                 |       |
|  H    | +-------------------+ +-------------------+       |
|  B    | +-------------------+ +-------------------+       |
|  O    | | Most Used App     | | Times Minimized    |       |
|  A    | | VS Code (3h 12m) | | 47                 |       |
|  R    | +-------------------+ +-------------------+       |
|  D    |                                                    |
|       | +----------------------------------------------+  |
|  S    | |  Today's Usage by Category  [Pie Chart]      |  |
|  C    | |                                              |  |
|  R    | |  [Productivity 45%] [Dev 30%] [Social 15%]  |  |
|  E    | +----------------------------------------------+  |
|  E    |                                                    |
|  N    | +----------------------------------------------+  |
|       | |  Hourly Activity  [Bar Chart]                |  |
|  T    | |  ████ ██ ███████ ████ ██ █                   |  |
|  I    | |  9am  10  11  12  1pm 2  3  4  5             |  |
|  M    | +----------------------------------------------+  |
|  E    |                                                    |
|       | +----------------------------------------------+  |
|  S    | |  Active Minimize Rules          [3 active]   |  |
|  C    | |  Notion.exe - idle 5min         [ON]         |  |
|  H    | |  Chrome - weekdays 9-5          [ON]         |  |
|  E    | |  Discord.exe - always           [OFF]        |  |
|  D    | +----------------------------------------------+  |
+-------+---------------------------------------------------+
```

#### Screen Time Page
- Date range selector (today / 7 days / 30 days / custom)
- Stacked bar chart showing daily usage by category
- Sortable table of all apps with: icon, name, category, time today,
  time this week, trend arrow
- Click an app to see its detailed usage history (session log, daily chart)

#### Schedules Page
- List of all minimize rules with toggle switches
- "Add Rule" button opens a form:
  - Select application (dropdown with search, shows running apps)
  - Rule type: Idle / Time-based / Always
  - For idle: threshold slider (30s to 60min)
  - For time-based: start time, end time, day-of-week checkboxes
  - Detection mode: process name vs. window title
- Edit and delete existing rules inline

#### Categories Page
- Grid of category cards, each showing: name, color dot, app count, total
  time today
- Click a category to see its apps and usage breakdown
- Drag-and-drop apps between categories
- "New Category" card to create custom categories
- Uncategorized apps section at the bottom for easy triage

#### Settings Page
- Tracking: enable/disable, polling interval
- Startup: launch on Windows boot, start minimized
- Data: retention period, export data (CSV/JSON), clear data
- Appearance: theme (light/dark/system)
- About: version, links

---

## 6. Implementation Phases

### Phase 1: Foundation (Backend Core + Database)
1. Set up the backend project structure with FastAPI
2. Implement SQLAlchemy models and database initialization
3. Refactor existing minimizer scripts into `minimizer_engine.py`
4. Build the screen time tracker service
5. Implement all CRUD API endpoints
6. Add app discovery service (auto-detect running applications)

### Phase 2: Dashboard Shell (Frontend + Electron)
1. Scaffold the Electron + React + Vite project
2. Implement the layout (sidebar navigation, header)
3. Build the API client layer
4. Create the Dashboard (home) page with summary cards and charts
5. Wire up the Electron main process to launch the Python backend

### Phase 3: Schedule Management
1. Build the Schedules page with CRUD form
2. Implement APScheduler integration for time-based rules
3. Connect schedule changes to the minimizer engine (hot-reload)
4. Add toggle switches and rule status indicators

### Phase 4: Screen Time Analytics
1. Build the Screen Time page with date range filtering
2. Implement charts: daily bar, category pie, trend line
3. Build per-app detail view with session history
4. Implement daily aggregation service for fast queries

### Phase 5: Categories & Usage Profiles
1. Build the Categories page with CRUD and color/icon pickers
2. Implement drag-and-drop app assignment
3. Add "by category" analytics views
4. Build usage profile summary (what % of time in each category)

### Phase 6: Polish & System Integration
1. System tray icon with quick controls (pause tracking, open dashboard)
2. Windows startup integration
3. Data export (CSV/JSON)
4. Light/dark theme support
5. Error handling, loading states, empty states
6. Performance optimization (database indexes, query caching)

---

## 7. Key Design Decisions

### Why SQLite over PostgreSQL/MySQL?
This is a single-user desktop application. SQLite is zero-config, file-based,
and embedded. No need to install or manage a database server. The data volume
(one row per ~5 seconds of tracking) is well within SQLite's capabilities.
At 5-second intervals, that's ~17,000 rows per day, ~6.2M per year -- SQLite
handles this without issue.

### Why Electron instead of a pure web app?
We need access to OS-level APIs (system tray, window management, startup
registration). Electron provides the desktop shell while letting us use
modern web technologies for the UI. The Python backend runs as a subprocess
managed by Electron.

### Why keep the backend in Python?
The existing minimizer scripts are Python. The core window management
libraries (pywinauto, psutil, ctypes wrappers) are all Python. Rewriting
in another language would mean losing this foundation. FastAPI is modern,
fast, and has excellent developer experience.

### Why separate backend and frontend processes?
Clean separation of concerns. The Python backend handles all OS interaction
and data management. The Electron frontend handles rendering. They communicate
via localhost HTTP. This also means the dashboard could eventually run in a
regular browser if needed.

---

## 8. Data Flow Diagrams

### Screen Time Tracking Flow
```
[Every 5 seconds]
    │
    ▼
GetForegroundWindow() ──► Get PID ──► psutil.Process(pid).name()
    │
    ▼
Is this a new app in focus?
    │
    ├── NO ──► Continue (no DB write)
    │
    └── YES
         │
         ├── Close previous event (set ended_at = now)
         │
         └── Insert new screen_time_event (app_id, started_at = now)
              │
              └── Is this app in the applications table?
                   │
                   ├── YES ──► Use existing app_id
                   └── NO  ──► Auto-insert into applications table
                                (process_name, category = Uncategorized)
```

### Minimize Schedule Execution Flow
```
[Schedule Engine Loop]
    │
    ▼
Load enabled schedules from DB
    │
    ▼
For each schedule:
    │
    ├── TYPE: idle
    │   └── Check system idle time > threshold?
    │       ├── YES ──► Find windows by process/title ──► Minimize
    │       └── NO  ──► Skip
    │
    ├── TYPE: time_based
    │   └── Is current time within start_time - end_time?
    │       └── Is today in days_of_week?
    │           ├── YES ──► Find windows ──► Minimize
    │           └── NO  ──► Skip
    │
    └── TYPE: always
        └── Find windows by process/title ──► Minimize
```

---

## 9. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| CPU usage (idle) | < 1% when no windows being tracked |
| CPU usage (active tracking) | < 3% during normal operation |
| Memory usage | < 150MB (backend + frontend combined) |
| Database size | < 500MB for 1 year of data at default intervals |
| Startup time | Dashboard usable within 3 seconds |
| API response time | < 100ms for all endpoints |
| Tracking accuracy | Within 5 seconds of actual app switch |

---

## 10. File & Directory Layout (Final)

```
minimize_application/
├── README.md
├── PLAN.md                         # This document
├── LICENSE
├── .gitignore
│
├── backend/                        # Python backend (FastAPI)
│   ├── requirements.txt
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   ├── services/
│   └── utils/
│
├── dashboard/                      # Electron + React frontend
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── electron/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       └── styles/
│
├── scripts/                        # Original scripts (preserved)
│   ├── minimize_by_process.pyw
│   └── minimize_by_title.py
│
└── __main__.py                     # Legacy entry point
```

---

## 11. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| High CPU usage from polling | Poor UX, battery drain | Adaptive polling: increase interval when idle, decrease on activity |
| SQLite write contention | Data loss or tracking gaps | WAL mode, batch inserts, separate read/write connections |
| Electron memory overhead | High RAM usage | Lazy-load pages, virtualize long lists, monitor with devtools |
| Windows API changes | Breaking on OS updates | Abstract all Windows calls behind a utility layer; easy to patch |
| Large database over time | Slow queries | Daily aggregation table, automatic data pruning per retention setting |
| Antivirus false positives | App blocked or quarantined | Code-sign the application, avoid suspicious patterns |

---

## 12. Browser Activity Tracking (Chrome Extension)

### Overview

Track full URLs visited in Chrome via a Manifest V3 extension. The extension
monitors tab activations and URL changes, then POSTs events to the local
backend API. Since all data stays local, we store full URLs (not just domains)
for future analysis like per-site time tracking and content categorization.

### Architecture

```
+---------------------------+           +---------------------------+
|    Chrome Extension        |   HTTP    |    FastAPI Backend         |
|    (Manifest V3)           | ───────► |    /api/browser-activity   |
|                            |  POST    |                            |
|  background.js             |          |  browser_activity.py       |
|  - chrome.tabs.onActivated |          |  - Store BrowserEvent      |
|  - chrome.tabs.onUpdated   |          |  - Query by date/domain    |
|  popup.html/js             |          |                            |
+---------------------------+           +---------------------------+
                                                    │
                                                    ▼
                                        +---------------------------+
                                        |  SQLite: browser_events   |
                                        |  - url, domain, title     |
                                        |  - started_at, ended_at   |
                                        |  - duration_seconds       |
                                        +---------------------------+
```

### Data Model: `browser_events`

```sql
CREATE TABLE browser_events (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    url           TEXT NOT NULL,
    domain        TEXT NOT NULL,
    page_title    TEXT,
    started_at    DATETIME NOT NULL,
    ended_at      DATETIME,
    duration_seconds INTEGER GENERATED ALWAYS AS
        (CAST((julianday(ended_at) - julianday(started_at)) * 86400 AS INTEGER)) STORED
);

CREATE INDEX idx_browser_events_date ON browser_events(started_at);
CREATE INDEX idx_browser_events_domain ON browser_events(domain);
```

### API Endpoints

```
POST   /api/browser-activity/events        # Extension POSTs active tab changes
GET    /api/browser-activity/today          # Today's browsing summary
GET    /api/browser-activity/range          # Browsing history for date range
GET    /api/browser-activity/domains        # Top domains with time spent
```

### Chrome Extension Structure

```
browser-extension/
├── manifest.json          # Manifest V3: permissions for tabs, host
├── background.js          # Service worker: tab event listeners
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic (tracking status, stats)
└── icons/                 # Extension icons (16, 48, 128)
```

### Tracking Flow

```
[Tab activated or URL changed]
    │
    ▼
background.js detects event
    │
    ├── chrome.tabs.onActivated → user switched tabs
    │
    └── chrome.tabs.onUpdated (status=complete) → page finished loading
         │
         ▼
    Is this a trackable URL? (http/https, not chrome://)
         │
         ├── NO → Skip
         │
         └── YES
              │
              ├── POST previous tab event to /api/browser-activity/events
              │   (sets ended_at = now)
              │
              └── Start tracking new tab (url, domain, title, started_at = now)
```

---

## 13. Success Metrics

Once built, the application should deliver:

1. **Visibility**: Users can see exactly how they spend their computer time,
   broken down by app and by their own custom categories
2. **Control**: Users can define rules that automatically minimize distracting
   apps -- by idle time, by schedule, or always
3. **Insight**: Trend data over days/weeks/months helps users understand and
   improve their habits
4. **Simplicity**: All configuration happens through the dashboard -- no
   editing config files or Python scripts
5. **Reliability**: Tracking runs silently in the background with minimal
   resource usage
