import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Obsidian Prism — palette derived from APICommerce Stitch design system
        bg: {
          DEFAULT: "#050505",
          surface: "#0e0e0f",
          1: "#131314",
          2: "#1c1b1c",
          3: "#201f20",
          4: "#2a2a2b",
          5: "#353436",
          bright: "#3a393a",
        },
        ink: {
          DEFAULT: "#e5e2e3",
          dim: "#b9cbbb",
          muted: "#849586",
        },
        line: {
          DEFAULT: "#3b4b3e",
          soft: "#242427",
        },
        primary: {
          DEFAULT: "#00ff94",
          ink: "#00391d",
          dim: "#00e383",
          soft: "#00713f",
          fixed: "#5bffa1",
        },
        secondary: {
          DEFAULT: "#00e0ff",
          ink: "#00363f",
          dim: "#00daf8",
          fixed: "#b9f1ff",
        },
        tertiary: {
          DEFAULT: "#e5b4ff",
          ink: "#4f0077",
          dim: "#9900e2",
        },
        success: "#00ff94",
        warning: "#ffb786",
        danger: "#ffb4ab",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        "label-caps": ["11px", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "700" }],
        "stats-lg": ["20px", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "500" }],
        "code-md": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      boxShadow: {
        "glow-primary": "0 0 18px rgba(0, 227, 131, 0.25)",
        "glow-secondary": "0 0 18px rgba(0, 224, 255, 0.25)",
        "glow-tertiary": "0 0 18px rgba(229, 180, 255, 0.25)",
      },
      backgroundImage: {
        "tech-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        "hero-glow":
          "radial-gradient(circle at 30% 20%, rgba(0,227,131,0.18), transparent 55%), radial-gradient(circle at 80% 60%, rgba(0,224,255,0.12), transparent 55%)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-soft": "pulseSoft 2.6s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
