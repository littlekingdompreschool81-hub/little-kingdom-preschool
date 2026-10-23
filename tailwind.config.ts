import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FFFFFF",
          100: "#FFFDF8",
          200: "#FAF6EE",
          300: "#F6EFE3",
          400: "#EFE6D6",
          500: "#DFD2BF",
        },
        sky: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        mint: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        sunshine: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        coral: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
        },
        lavender: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
        },
        brand: {
          text: "#1E293B",
          heading: "#0F172A",
          navy: "#0A2540",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: [
          "Outfit",
          "Quicksand",
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        heading: [
          "Outfit",
          "Quicksand",
          "Plus Jakarta Sans",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      animation: {
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "float-delayed": "floatGentle 4s ease-in-out 2s infinite",
        "cloud-drift": "cloudDrift 28s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        "bounce-subtle": "bounceSubtle 2.5s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        cloudDrift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
