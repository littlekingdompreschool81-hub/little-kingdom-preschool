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
          100: "#FFFDF9",
          200: "#FAF6EE",
          300: "#F5EFEB",
          400: "#EFE6DE",
          500: "#DFD2C4",
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
          50: "#F2FBF7",
          100: "#ECFDF5",
          200: "#D1FAE5",
          300: "#A7F3D0",
          400: "#6EE7B7",
          500: "#34D399",
          600: "#10B981",
          700: "#059669",
          800: "#047857",
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
        brand: {
          text: "#1E293B",
          heading: "#0F172A",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: [
          "Quicksand",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "Outfit",
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.88" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
