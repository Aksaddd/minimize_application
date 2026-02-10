import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "Geist",
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "sans-serif",
      ],
      mono: [
        "Geist Mono",
        "SF Mono",
        "Fira Code",
        "Fira Mono",
        "Roboto Mono",
        "Courier New",
        "monospace",
      ],
    },
    borderRadius: {
      none: "0",
      sm: "6px",
      DEFAULT: "8px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px",
    },
    extend: {
      colors: {
        /* Geist-inspired gray scale using CSS variables */
        surface: {
          root: "var(--bg-root)",
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          hover: "var(--bg-hover)",
          active: "var(--bg-active)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
          subtle: "var(--border-subtle)",
        },
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          quaternary: "var(--text-quaternary)",
          inverted: "var(--text-inverted)",
        },
        fill: {
          contrast: "var(--fill-contrast)",
          "contrast-hover": "var(--fill-contrast-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          active: "var(--accent-active)",
          subtle: "var(--accent-subtle)",
          on: "var(--accent-on)",
        },
        success: {
          DEFAULT: "var(--success)",
          subtle: "var(--success-subtle)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          subtle: "var(--warning-subtle)",
        },
        error: {
          DEFAULT: "var(--error)",
          subtle: "var(--error-subtle)",
        },
        /* Category chart colors */
        chart: {
          blue: "var(--chart-blue)",
          violet: "var(--chart-violet)",
          cyan: "var(--chart-cyan)",
          rose: "var(--chart-rose)",
          amber: "var(--chart-amber)",
          emerald: "var(--chart-emerald)",
          orange: "var(--chart-orange)",
          slate: "var(--chart-slate)",
        },
      },
      fontSize: {
        display: ["48px", { lineHeight: "52px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-1": ["30px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-2": ["24px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-3": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-4": ["16px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" }],
        body: ["14px", { lineHeight: "20px", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "18px", letterSpacing: "0.005em", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0em", fontWeight: "500" }],
        label: ["13px", { lineHeight: "18px", letterSpacing: "0.005em", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "400" }],
        tiny: ["11px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "400" }],
      },
      spacing: {
        /* 4px grid tokens */
        "sp-0": "0px",
        "sp-1": "4px",
        "sp-2": "8px",
        "sp-3": "12px",
        "sp-4": "16px",
        "sp-5": "20px",
        "sp-6": "24px",
        "sp-8": "32px",
        "sp-10": "40px",
        "sp-12": "48px",
        "sp-16": "64px",
        sidebar: "240px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.04)",
        sm: "0 2px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        md: "0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
        lg: "0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
      },
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1.0)",
      },
      keyframes: {
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s linear infinite",
        "fade-in": "fade-in 200ms cubic-bezier(0, 0, 0.58, 1.0)",
        "slide-down": "slide-down 200ms cubic-bezier(0, 0, 0.58, 1.0)",
      },
    },
  },
  plugins: [],
};

export default config;
