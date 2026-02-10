# Minimize Application - Design System

## Philosophy

This design system merges two world-class aesthetics:

- **Vercel/Geist**: Monochrome precision, pure black dark mode, 1px borders,
  Swiss-inspired typography, developer-tool clarity
- **Apple HIG**: Spatial depth, spring-based motion, sidebar-first navigation,
  content deference, native desktop feel

The result: a dashboard that feels like it was made by the team that designed
Vercel's dashboard but ships as a native desktop app that respects macOS/Windows
conventions.

**Core Principles:**
1. **Content over chrome** - UI elements defer to data. Charts, numbers, and
   status indicators are the stars.
2. **Monochrome + one accent** - Grayscale foundation with a single accent
   color for interactive elements. No rainbow.
3. **Precision** - 4px grid. 1px borders. Exact spacing. Every pixel intentional.
4. **Quietness** - No decorative gradients, no drop shadows for style. Depth
   is communicated through layering and subtle borders.
5. **Motion with purpose** - Spring-based animations that communicate state
   changes, not entertain.

---

## 1. Color System

### 1.1 Gray Scale (Geist-inspired)

The gray scale is the backbone. Pure black and pure white as endpoints,
with carefully spaced steps between them.

```
Token               Light Mode     Dark Mode
─────────────────────────────────────────────
--bg-root           #FFFFFF        #000000
--bg-primary        #FFFFFF        #0A0A0A
--bg-secondary      #FAFAFA        #111111
--bg-tertiary       #F5F5F5        #1A1A1A
--bg-hover          #F0F0F0        #1F1F1F
--bg-active         #EBEBEB        #262626

--border-default    #EAEAEA        #333333
--border-strong     #DBDBDB        #444444
--border-subtle     #F0F0F0        #1F1F1F

--text-primary      #000000        #EDEDED
--text-secondary    #666666        #A1A1A1
--text-tertiary     #999999        #707070
--text-quaternary   #CCCCCC        #484848
--text-inverted     #FFFFFF        #000000

--fill-contrast     #000000        #EDEDED
--fill-contrast-hover #333333      #CCCCCC
```

### 1.2 Accent Color

Single accent drawn from Vercel's blue, used sparingly for interactive
and status-critical elements.

```
Token               Light Mode     Dark Mode
─────────────────────────────────────────────
--accent            #0070F3        #3291FF
--accent-hover      #0060D1        #52A8FF
--accent-active     #0050B0        #1A7FFF
--accent-subtle     #EBF5FF        #0070F31A
--accent-on         #FFFFFF        #FFFFFF
```

### 1.3 Semantic Colors

Used for status indicators, charts, and feedback.

```
Token               Light Mode     Dark Mode
─────────────────────────────────────────────
--success           #17B169        #3ECF8E
--success-subtle    #EFFCF6        #17B1691A
--warning           #F5A623        #F7B955
--warning-subtle    #FEF7E8        #F5A6231A
--error             #EE0000        #FF4444
--error-subtle      #FEE9E9        #EE00001A
```

### 1.4 Category Palette

For the chart system and category color coding. Carefully balanced for
both light and dark modes to maintain equal visual weight.

```
Slot    Name            Light          Dark
────────────────────────────────────────────
1       Blue            #0070F3        #3291FF
2       Violet          #7928CA        #8A63D2
3       Cyan            #00B4D8        #50E3C2
4       Rose            #E11D48        #FB7185
5       Amber           #D97706        #FBBF24
6       Emerald         #059669        #34D399
7       Orange          #EA580C        #FB923C
8       Slate           #475569        #94A3B8
```

---

## 2. Typography

### 2.1 Font Stack

```css
--font-sans:  "Geist", "Inter", -apple-system, BlinkMacSystemFont,
              "Segoe UI", "Roboto", "Helvetica Neue", sans-serif;
--font-mono:  "Geist Mono", "SF Mono", "Fira Code", "Fira Mono",
              "Roboto Mono", "Courier New", monospace;
```

Geist is the primary typeface. Inter is the fallback. The system font
stack ensures graceful degradation.

### 2.2 Type Scale

Based on a 4px grid. Every size, line-height, and letter-spacing is
intentional.

```
Token           Size    Line-H   Weight   Tracking   Usage
──────────────────────────────────────────────────────────────
--display       48px    52px     600      -0.02em    Hero numbers (total screen time)
--heading-1     30px    36px     600      -0.02em    Page titles
--heading-2     24px    32px     600      -0.015em   Section headers
--heading-3     20px    28px     600      -0.01em    Card titles
--heading-4     16px    24px     600      -0.005em   Sub-section headers

--body-lg       16px    24px     400       0.00em    Primary body text
--body          14px    20px     400       0.00em    Standard body text
--body-sm       13px    18px     400       0.005em   Dense UI text

--label-lg      14px    20px     500       0.00em    Primary labels
--label         13px    18px     500       0.005em   Standard labels
--label-sm      12px    16px     500       0.01em    Small labels, badges

--caption       12px    16px     400       0.01em    Captions, timestamps
--tiny          11px    16px     400       0.01em    Fine print, chart axis labels
```

### 2.3 Type Rules

- **Headings** use weight 600 (semibold) with negative tracking for tightness
- **Body** uses weight 400 (regular) with neutral tracking
- **Labels** use weight 500 (medium) -- the bridge between body and heading
- **Numbers in cards** use `--display` or `--heading-1` with `font-variant-numeric: tabular-nums`
  for consistent width as values change
- **Monospace** for durations displayed as `HH:MM:SS`, process names, and
  technical identifiers

---

## 3. Spacing & Layout

### 3.1 Spacing Scale (4px base grid)

```
Token      Value    Usage
─────────────────────────────────
--sp-0     0px
--sp-1     4px      Tight gaps (icon-to-text in badges)
--sp-2     8px      Inline spacing, small gaps
--sp-3     12px     Default gap between related items
--sp-4     16px     Standard padding, card internal spacing
--sp-5     20px     Section gaps within cards
--sp-6     24px     Between cards in a grid
--sp-8     32px     Between sections
--sp-10    40px     Page-level vertical rhythm
--sp-12    48px     Major section dividers
--sp-16    64px     Top-level page padding
```

### 3.2 Layout Grid

```
Sidebar width:        240px (fixed)
Content max-width:    1200px
Content padding:      32px (all sides)
Card grid gap:        24px
Card internal pad:    20px
```

### 3.3 Breakpoints

Since this is an Electron desktop app, breakpoints handle window resizing:

```
--bp-compact:     < 900px    (2-col grid becomes 1-col)
--bp-default:     900-1200px (standard 2-col layout)
--bp-wide:        > 1200px   (4-col metric cards, 2-col charts)
```

---

## 4. Borders & Radius

### 4.1 Border Widths

```
--border-width:   1px        Always 1px. Never 2px. Precision.
```

### 4.2 Border Radius Scale

Apple-inspired radius system with generously rounded interactive elements
and subtler rounding on containers.

```
Token           Value    Usage
──────────────────────────────────────
--radius-sm     6px      Badges, tags, small chips
--radius-md     8px      Buttons, inputs, dropdowns
--radius-lg     12px     Cards, modals, popovers
--radius-xl     16px     Large panels, image containers
--radius-full   9999px   Pills, avatar circles, toggles
```

### 4.3 Border Style

```css
/* Default card border */
border: 1px solid var(--border-default);

/* Hover state - border strengthens */
border: 1px solid var(--border-strong);

/* Focus ring (keyboard navigation) */
outline: 2px solid var(--accent);
outline-offset: 2px;
```

---

## 5. Shadows & Elevation

Minimal shadows. Depth is communicated primarily through borders and
background color layering, not box-shadows. When shadows are used,
they are barely perceptible.

```
Token               Value                                        Usage
──────────────────────────────────────────────────────────────────────────
--shadow-xs         0 1px 2px rgba(0,0,0,0.04)                  Buttons resting
--shadow-sm         0 2px 4px rgba(0,0,0,0.04),                 Cards on hover
                    0 1px 2px rgba(0,0,0,0.03)
--shadow-md         0 4px 12px rgba(0,0,0,0.06),                Dropdowns, popovers
                    0 2px 4px rgba(0,0,0,0.04)
--shadow-lg         0 8px 24px rgba(0,0,0,0.08),                Modals
                    0 4px 8px rgba(0,0,0,0.04)

/* Dark mode: shadows become near-invisible. Borders do the work. */
/* Dark mode shadow multiplier: 0.5x opacity of light mode values */
```

---

## 6. Component Specifications

### 6.1 Sidebar Navigation

```
┌─────────────────────────────┐
│                             │
│  ◆ Minimize         [—][□] │   Logo area: 240x64px
│    Application Manager      │   Border-bottom: 1px --border-subtle
│                             │
├─────────────────────────────┤
│                             │
│  ■ Dashboard                │   Nav item: h=36px, px=12, gap=10
│    Screen Time              │   Active: bg --bg-tertiary, text --text-primary
│    Schedules                │   Hover: bg --bg-hover
│    Categories               │   Icon: 16x16, stroke-width 1.5
│    Settings                 │   Font: --label, weight 500
│                             │
├─────────────────────────────┤   Bottom section
│                             │   separated by border-top
│  ● Tracking Active          │   Status dot: 8x8 green circle
│    Chrome — 2m 34s          │   Live session info: --caption
│                             │
└─────────────────────────────┘

Background: --bg-primary
Border-right: 1px solid --border-default
Width: 240px, height: 100vh, position: fixed
```

### 6.2 Metric Cards (Dashboard)

```
┌─────────────────────────────┐
│  Screen Time         ↑ 12%  │   Header row: --label-sm --text-secondary
│                             │   Trend badge: --caption, green/red
│  6h 42m                    │   Value: --display, --text-primary
│                             │   tabular-nums, font-weight 600
│  ▁▂▃▅▇█▇▅▃▂▁               │   Sparkline: 48px tall, --accent stroke
│                             │
└─────────────────────────────┘

Dimensions: min-width 220px, height auto
Padding: 20px
Border: 1px solid --border-default
Border-radius: --radius-lg
Background: --bg-primary
Hover: border-color --border-strong, shadow --shadow-sm
Transition: 150ms ease
```

### 6.3 Data Table (Screen Time)

```
┌───────────────────────────────────────────────────────────────────┐
│  Icon  Application     Category        Today    This Week  Trend │  Header
├───────────────────────────────────────────────────────────────────┤
│  ◻    VS Code          Development    3h 12m    18h 45m    ↑    │  Row
│  ◻    Chrome           Browsing       1h 48m    12h 03m    ↓    │
│  ◻    Notion           Productivity   1h 15m     8h 22m    →    │
│  ◻    Discord          Communication    45m      5h 10m    ↑    │
│  ◻    Spotify          Entertainment   22m      2h 48m    →    │
└───────────────────────────────────────────────────────────────────┘

Header:
  Font: --label-sm, weight 500, --text-tertiary
  Background: --bg-secondary
  Padding: 8px 16px
  Text-transform: none (no uppercase)
  Border-bottom: 1px solid --border-default

Row:
  Font: --body, --text-primary
  Padding: 12px 16px
  Border-bottom: 1px solid --border-subtle
  Hover: background --bg-hover
  Transition: background 100ms ease

Duration values:
  Font: --font-mono, --body, tabular-nums
  Right-aligned

Trend arrows:
  ↑ --success, ↓ --error, → --text-tertiary
  Font: --label-sm
```

### 6.4 Buttons

```
Variant       Background          Text              Border
──────────────────────────────────────────────────────────────
Primary       --fill-contrast     --text-inverted   none
Secondary     --bg-primary        --text-primary    1px --border-default
Ghost         transparent         --text-secondary  none
Danger        --error-subtle      --error           1px --error/20%

Sizes:
  sm:  h=32px,  px=12px,  font: --label-sm
  md:  h=36px,  px=16px,  font: --label
  lg:  h=40px,  px=20px,  font: --label-lg

States:
  Hover:    Lighten background 8%, border --border-strong
  Active:   Scale 0.98, darken background 4%
  Disabled: Opacity 0.5, cursor not-allowed
  Loading:  Content hidden, centered spinner (14px)

Radius: --radius-md (8px)
Transition: all 150ms ease
```

### 6.5 Toggle Switch

```
OFF:  ┌──────[○    ]──────┐   Track: --bg-tertiary, 40x22px
ON:   ┌──────[    ●]──────┐   Track: --accent, 40x22px
                               Thumb: --bg-primary, 18x18px, shadow --shadow-xs
                               Radius: --radius-full
                               Transition: transform 200ms spring(1, 80, 10)
```

### 6.6 Schedule Rule Card

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ◻ Notion.exe                              [━━━ ON]    │   App: --label-lg
│  Minimize after 5 minutes idle                          │   Rule: --body-sm --text-secondary
│                                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐                           │
│  │ Idle │ │ 5min │ │ Proc │                           │   Tags: --label-sm
│  └──────┘ └──────┘ └──────┘                           │   bg: --bg-tertiary
│                                                         │   radius: --radius-sm
│                                        [Edit] [Delete]  │   Actions: ghost buttons
└─────────────────────────────────────────────────────────┘

Padding: 20px
Border: 1px solid --border-default
Radius: --radius-lg
Hover: border --border-strong
Enabled: left border 2px solid --accent (replace left 1px border)
Disabled: opacity 0.6
```

### 6.7 Category Card

```
┌─────────────────────────────┐
│  ● Productivity        12 ▸ │   Dot: 8x8, category color
│                             │   Count: --label-sm --text-tertiary
│  4h 22m                    │   Time: --heading-3
│  today                      │   Label: --caption --text-tertiary
│                             │
│  ████████████░░░░░░         │   Bar: 6px tall, radius-full
│  62% of total               │   Percent: --caption --text-tertiary
│                             │
└─────────────────────────────┘

Padding: 20px
Border: 1px solid --border-default
Radius: --radius-lg
Top-border accent: 2px solid [category-color]
Hover: shadow --shadow-sm, border --border-strong
```

### 6.8 Chart Containers

```
┌─────────────────────────────────────────────────────┐
│  Usage by Category                  [Day ▾]         │   Title: --label-lg
│                                                     │   Selector: secondary button sm
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │   Chart area
│  │          [Recharts rendered here]           │   │   Background: transparent
│  │                                             │   │   Height: 280px
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ● Productivity  ● Development  ● Browsing         │   Legend: inline
│                                                     │   Dot: 8x8, radius-full
└─────────────────────────────────────────────────────┘   Font: --caption

Chart styling:
  Grid lines: --border-subtle, dashed
  Axis text: --tiny, --text-tertiary
  Tooltip: bg --bg-primary, border --border-default, shadow --shadow-md
           radius --radius-md, padding 12px
  Bar radius: 4px top corners
  Line stroke-width: 2px
  Dot: hidden by default, 4px radius on hover
```

### 6.9 Modal / Dialog

```
┌─────────────────── Overlay ────────────────────────────┐
│                 rgba(0,0,0,0.5)                        │
│    ┌─────────────────────────────────────────┐         │
│    │  Add Minimize Rule                   ✕  │         │  Header: --heading-4
│    ├─────────────────────────────────────────┤         │  border-bottom
│    │                                         │         │
│    │  Application                            │         │  Form fields
│    │  ┌─────────────────────────────────┐   │         │  Label: --label-sm --text-secondary
│    │  │ Search applications...     ▾    │   │         │  Input: h=36px, radius-md
│    │  └─────────────────────────────────┘   │         │  border --border-default
│    │                                         │         │
│    │  Rule Type                              │         │  Segment control for type
│    │  ┌────────┬────────────┬────────┐      │         │  h=32px, radius-md
│    │  │  Idle  │ Time-based │ Always │      │         │  active: --fill-contrast bg
│    │  └────────┴────────────┴────────┘      │         │
│    │                                         │         │
│    │  Idle Threshold                         │         │  Slider + value label
│    │  ◄━━━━━━━━━●━━━━━━━━━━━━━━━━━━━►       │         │
│    │  30s            5 min           60m     │         │
│    │                                         │         │
│    ├─────────────────────────────────────────┤         │
│    │              [Cancel]   [Create Rule]   │         │  Footer: border-top
│    └─────────────────────────────────────────┘         │  padding 16px
│                                                        │
└────────────────────────────────────────────────────────┘

Modal:
  Width: 480px
  Background: --bg-primary
  Border: 1px solid --border-default
  Radius: --radius-xl (16px)
  Shadow: --shadow-lg
  Entry animation: scale(0.96) -> scale(1), opacity 0 -> 1
  Duration: 200ms, ease-out
  Overlay fade: 150ms
```

### 6.10 Input Fields

```
Resting:
┌─────────────────────────────────────┐
│  Placeholder text...                │   h=36px, px=12px
└─────────────────────────────────────┘   border: --border-default
                                          radius: --radius-md
Focused:                                  font: --body
┌─────────────────────────────────────┐
│  User input text                    │   border: --accent (not a glow ring)
└─────────────────────────────────────┘   shadow: 0 0 0 1px --accent

With label:
  Application
  ┌─────────────────────────────────┐
  │  Search applications...         │     Label: --label-sm --text-secondary
  └─────────────────────────────────┘     margin-bottom: 6px
```

---

## 7. Motion & Animation

### 7.1 Philosophy

Every animation must answer: "What state change am I communicating?"
If there is no answer, remove the animation.

### 7.2 Timing

```
Token               Value           Usage
──────────────────────────────────────────────────
--duration-instant   100ms          Hover states, toggles
--duration-fast      150ms          Button feedback, border transitions
--duration-normal    200ms          Modal open, dropdown expand
--duration-slow      300ms          Page transitions, large layout shifts
```

### 7.3 Easing

```
--ease-default:  cubic-bezier(0.25, 0.1, 0.25, 1.0)     Standard transitions
--ease-in:       cubic-bezier(0.42, 0, 1.0, 1.0)         Elements entering
--ease-out:      cubic-bezier(0, 0, 0.58, 1.0)           Elements exiting
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1.0)     Playful feedback (toggles)
```

### 7.4 Animation Patterns

```
Pattern              Properties                    Timing
───────────────────────────────────────────────────────────────
Hover lift           transform: translateY(-1px)   --duration-fast --ease-default
Card hover           border-color, box-shadow      --duration-fast --ease-default
Toggle slide         transform: translateX(18px)   --duration-normal --ease-spring
Modal enter          opacity + scale(0.96->1)      --duration-normal --ease-out
Modal exit           opacity + scale(1->0.98)      --duration-fast --ease-in
Dropdown open        opacity + translateY(-4->0)   --duration-normal --ease-out
Page transition      opacity                       --duration-slow --ease-default
Skeleton shimmer     background-position            1.5s linear infinite
Sparkline draw       stroke-dashoffset              600ms --ease-out
Number count-up      Custom spring via Framer       stiffness:100 damping:30
```

### 7.5 Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- All transitions become instant (0ms)
- No transforms
- Opacity transitions remain but use 100ms
- Skeleton shimmer stops
- Number count-up jumps to final value

---

## 8. Iconography

### 8.1 Library

**Lucide React** - Consistent 24x24 grid, 1.5px stroke weight, rounded joins.
Matches Geist's precision aesthetic.

### 8.2 Sizes

```
Context          Size     Stroke
────────────────────────────────
Sidebar nav      16x16    1.5px
Button icon      16x16    1.5px
Card header      20x20    1.5px
Empty state      48x48    1.25px
```

### 8.3 Key Icons Mapping

```
Page/Feature         Icon
─────────────────────────────
Dashboard            LayoutDashboard
Screen Time          Clock
Schedules            CalendarClock
Categories           Grid3x3
Settings             Settings
Add/Create           Plus
Edit                 Pencil
Delete               Trash2
Toggle On            ToggleRight
Toggle Off           ToggleLeft
Trend Up             TrendingUp
Trend Down           TrendingDown
Trend Flat           Minus
Search               Search
Close                X
Chevron              ChevronRight
External             ArrowUpRight
```

---

## 9. Dark Mode Strategy

### 9.1 Approach

**System-first with manual override.** Default follows OS preference.
User can force light, dark, or system in Settings.

### 9.2 Implementation

```
<html class="dark">  or  <html class="light">

/* Tailwind dark mode via class strategy */
darkMode: "class"
```

### 9.3 Key Principles

1. **Pure black background** (`#000000`) - Vercel signature. Not `#111` or `#1a1a1a`.
   The root background is pure black. Content surfaces float above at `#0A0A0A`.
2. **Borders carry the load** - In dark mode, shadows are nearly invisible.
   Borders become the primary depth indicator.
3. **Text never pure white** - Primary text is `#EDEDED`, not `#FFFFFF`.
   Reduces eye strain and feels more refined.
4. **Accent stays vibrant** - Blue shifts slightly lighter in dark mode to
   maintain contrast ratio.
5. **Charts desaturate slightly** - Category colors reduce saturation by ~10%
   in dark mode to avoid visual harshness.

---

## 10. Page-Level Compositions

### 10.1 Dashboard Page

```
┌──────┬─────────────────────────────────────────────────────────────┐
│      │  Dashboard                                                  │
│  S   │                                                             │
│  I   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│  D   │  │Screen   │ │Apps     │ │Most     │ │Times    │         │
│  E   │  │Time     │ │Tracked  │ │Used     │ │Minimzd │         │
│  B   │  │         │ │         │ │         │ │         │         │
│  A   │  │ 6h 42m  │ │ 12      │ │VS Code  │ │ 47      │         │
│  R   │  │▁▂▃▅▇▅▃  │ │▁▂▅▇▅▃▂  │ │ 3h 12m  │ │▇▅▃▂▁▂▃  │         │
│      │  └─────────┘ └─────────┘ └─────────┘ └─────────┘         │
│      │                                                             │
│      │  ┌──────────────────────┐ ┌──────────────────────┐         │
│      │  │ Usage by Category    │ │ Today's Timeline     │         │
│      │  │                      │ │                      │         │
│      │  │    [Pie / Donut]     │ │  [Stacked Bar]       │         │
│      │  │                      │ │                      │         │
│      │  │ ● Prod  ● Dev       │ │  9  10  11  12  1    │         │
│      │  └──────────────────────┘ └──────────────────────┘         │
│      │                                                             │
│      │  Active Rules                                    View All ▸ │
│      │  ┌──────────────────────────────────────────────────────┐  │
│      │  │ ◻ Notion.exe    Idle 5min    Process    [━━━ ON]    │  │
│      │  │ ◻ Chrome        9:00-17:00   Title      [━━━ ON]    │  │
│      │  │ ◻ Discord.exe   Always       Process    [━━  OFF]   │  │
│      │  └──────────────────────────────────────────────────────┘  │
└──────┴─────────────────────────────────────────────────────────────┘
```

### 10.2 Screen Time Page

```
┌──────┬─────────────────────────────────────────────────────────────┐
│      │  Screen Time                      [Today ▾] [7d] [30d]     │
│  S   │                                                             │
│  I   │  ┌──────────────────────────────────────────────────────┐  │
│  D   │  │                                                      │  │
│  E   │  │  [Stacked Area Chart - Usage by Category Over Time]  │  │
│  B   │  │                                                      │  │
│  A   │  │  Mon    Tue    Wed    Thu    Fri    Sat    Sun        │  │
│  R   │  └──────────────────────────────────────────────────────┘  │
│      │                                                             │
│      │  Applications                              Search... 🔍    │
│      │  ┌────────────────────────────────────────────────────────┐│
│      │  │ Icon  Application    Category       Today   Week   ▲  ││
│      │  ├────────────────────────────────────────────────────────┤│
│      │  │ ◻    VS Code        Development    3h12m  18h45m  ↑  ││
│      │  │ ◻    Chrome         Browsing       1h48m  12h03m  ↓  ││
│      │  │ ◻    Notion         Productivity   1h15m   8h22m  →  ││
│      │  │ ◻    Discord        Communication    45m   5h10m  ↑  ││
│      │  │ ◻    Spotify        Entertainment    22m   2h48m  →  ││
│      │  └────────────────────────────────────────────────────────┘│
└──────┴─────────────────────────────────────────────────────────────┘
```

### 10.3 Schedules Page

```
┌──────┬─────────────────────────────────────────────────────────────┐
│      │  Schedules                                  [+ Add Rule]    │
│  S   │  3 active rules                                             │
│  I   │                                                             │
│  D   │  ┌──────────────────────────────────────────────────────┐  │
│  E   │  │▎ ◻ Notion.exe                            [━━━ ON]   │  │
│  B   │  │▎ Minimize after 5 minutes idle                       │  │
│  A   │  │▎ ┌──────┐ ┌──────┐ ┌──────┐                        │  │
│  R   │  │▎ │ Idle │ │ 5min │ │ Proc │          [Edit] [Del]  │  │
│      │  │  └──────┘ └──────┘ └──────┘                         │  │
│      │  └──────────────────────────────────────────────────────┘  │
│      │                                                             │
│      │  ┌──────────────────────────────────────────────────────┐  │
│      │  │▎ ◻ Chrome                                 [━━━ ON]   │  │
│      │  │▎ Minimize Mon-Fri 9:00 AM - 5:00 PM                 │  │
│      │  │▎ ┌──────────┐ ┌──────────┐ ┌───────┐               │  │
│      │  │▎ │Scheduled │ │ 9AM-5PM  │ │ Title │  [Edit] [Del] │  │
│      │  │  └──────────┘ └──────────┘ └───────┘                │  │
│      │  └──────────────────────────────────────────────────────┘  │
│      │                                                             │
│      │  ┌──────────────────────────────────────────────────────┐  │
│      │  │  ◻ Discord.exe                           [━━  OFF]  │  │
│      │  │  Always minimize when opened                         │  │
│      │  │  ┌────────┐ ┌──────┐                                │  │
│      │  │  │ Always │ │ Proc │                    [Edit] [Del]│  │
│      │  │  └────────┘ └──────┘                                │  │
│      │  └──────────────────────────────────────────────────────┘  │
└──────┴─────────────────────────────────────────────────────────────┘
```

### 10.4 Categories Page

```
┌──────┬─────────────────────────────────────────────────────────────┐
│      │  Categories                             [+ New Category]    │
│  S   │                                                             │
│  I   │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  D   │  │▔▔(green)▔▔▔▔ │ │▔▔(purple)▔▔▔ │ │▔▔(blue)▔▔▔▔ │       │
│  E   │  │● Productivity│ │● Development │ │● Browsing    │       │
│  B   │  │  3 apps   ▸  │ │  2 apps   ▸  │ │  2 apps   ▸  │       │
│  A   │  │              │ │              │ │              │       │
│  R   │  │  4h 22m      │ │  3h 12m      │ │  1h 48m      │       │
│      │  │  today       │ │  today       │ │  today       │       │
│      │  │              │ │              │ │              │       │
│      │  │ ████████░░░  │ │ ██████░░░░░  │ │ ████░░░░░░░  │       │
│      │  │ 62%          │ │ 45%          │ │ 25%          │       │
│      │  └──────────────┘ └──────────────┘ └──────────────┘       │
│      │                                                             │
│      │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│      │  │▔▔(rose)▔▔▔▔▔ │ │▔▔(amber)▔▔▔▔│ │ ┌──────────┐│       │
│      │  │● Communicatn │ │● Entertainmt │ │ │  + New   ││       │
│      │  │  2 apps   ▸  │ │  1 app    ▸  │ │ │ Category ││       │
│      │  │              │ │              │ │ └──────────┘│       │
│      │  │  45m         │ │  22m         │ │  dashed border      │
│      │  └──────────────┘ └──────────────┘ └──────────────┘       │
│      │                                                             │
│      │  Uncategorized                                    2 apps    │
│      │  ┌──────────────────────────────────────────────────────┐  │
│      │  │ ◻ TaskManager.exe          [Assign to category ▾]   │  │
│      │  │ ◻ Calculator.exe           [Assign to category ▾]   │  │
│      │  └──────────────────────────────────────────────────────┘  │
└──────┴─────────────────────────────────────────────────────────────┘
```

### 10.5 Settings Page

```
┌──────┬─────────────────────────────────────────────────────────────┐
│      │  Settings                                                   │
│  S   │                                                             │
│  I   │  ┌───────────────────────────────────────────┐             │
│  D   │  │  Tracking                                 │             │
│  E   │  │                                           │             │
│  B   │  │  Enable screen time tracking   [━━━ ON]   │             │
│  A   │  │  Record which app is in focus             │             │
│  R   │  │                                           │             │
│      │  │  Polling interval                         │             │
│      │  │  ◄━━━━━━━●━━━━━━━━━━━━━━━►  5s           │             │
│      │  │  1s                           30s         │             │
│      │  └───────────────────────────────────────────┘             │
│      │                                                             │
│      │  ┌───────────────────────────────────────────┐             │
│      │  │  Startup                                  │             │
│      │  │                                           │             │
│      │  │  Launch on system boot         [━━  OFF]  │             │
│      │  │  Start minimized to tray       [━━  OFF]  │             │
│      │  └───────────────────────────────────────────┘             │
│      │                                                             │
│      │  ┌───────────────────────────────────────────┐             │
│      │  │  Data                                     │             │
│      │  │                                           │             │
│      │  │  Keep data for      [90 days ▾]           │             │
│      │  │                                           │             │
│      │  │  [Export CSV]  [Export JSON]               │             │
│      │  │                                           │             │
│      │  │  [Clear All Data]   destructive/red       │             │
│      │  └───────────────────────────────────────────┘             │
│      │                                                             │
│      │  ┌───────────────────────────────────────────┐             │
│      │  │  Appearance                               │             │
│      │  │                                           │             │
│      │  │  Theme                                    │             │
│      │  │  ┌────────┬───────┬──────────┐           │             │
│      │  │  │ Light  │ Dark  │ System ● │           │             │
│      │  │  └────────┴───────┴──────────┘           │             │
│      │  └───────────────────────────────────────────┘             │
└──────┴─────────────────────────────────────────────────────────────┘
```

---

## 11. Responsive Behavior (Electron Window Resizing)

```
Window < 900px (compact):
  - Sidebar collapses to icon-only (56px wide)
  - Metric cards: 2-column grid
  - Charts: single column, stacked
  - Table: horizontal scroll

Window 900-1200px (default):
  - Full sidebar (240px)
  - Metric cards: 2-column grid
  - Charts: 2-column grid
  - Table: full width

Window > 1200px (wide):
  - Full sidebar (240px)
  - Metric cards: 4-column grid
  - Charts: 2-column grid
  - Table: full width with extra columns
```

---

## 12. Accessibility

- All interactive elements have visible focus rings (`outline: 2px solid --accent`)
- Color is never the sole indicator -- pair with icons, text, or patterns
- Contrast ratios: all text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- `prefers-reduced-motion` disables all transforms and delays
- `prefers-color-scheme` detected automatically for initial theme
- Keyboard navigation: full tab order, arrow keys in nav, Escape to close modals
- Screen reader: semantic HTML, ARIA labels on icons, live regions for counters
