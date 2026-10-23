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
        navy: {
          950: "#040810",
          900: "#070E1B",
          850: "#0B1629",
          800: "#0F203B",
          700: "#162E52",
          600: "#214273",
          500: "#325E9E",
          400: "#5B87CA",
          300: "#8EADE0",
          200: "#C4D5F2",
          100: "#E3ECFA",
          50: "#F2F6FC",
        },
        gold: {
          950: "#2B1F08",
          900: "#4D380E",
          800: "#7A5A17",
          700: "#A37920",
          600: "#C9972A",
          500: "#D4AF37", // Warm Royal Gold
          400: "#E2C35D",
          300: "#EED789",
          200: "#F6EAB8",
          100: "#FBF5DE",
          50: "#FDFCF6",
        },
        ivory: {
          DEFAULT: "#FDFBF7",
          50: "#FFFFFF",
          100: "#FDFBF7",
          200: "#F8F5EE",
          300: "#EDE7DC",
          400: "#DFD7C7",
          500: "#C8BDB0",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ECC874 0%, #D4AF37 50%, #A97E22 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 50%, transparent 100%)",
        "navy-radial": "radial-gradient(circle at top center, #132440 0%, #070E1B 70%, #040810 100%)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
