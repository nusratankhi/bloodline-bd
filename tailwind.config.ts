import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D71920",
          "red-dark": "#B31319",
          "red-light": "#FFF0F0",
          green: "#006A4E",
          "green-dark": "#004D39",
          "green-light": "#E6F4EA",
          navy: "#101828",
          slate: "#475467",
          ivory: "#F8FAFC",
        },
        border: "hsl(var(--border, 214.3 31.8% 91.4%))",
        input: "hsl(var(--input, 214.3 31.8% 91.4%))",
        ring: "hsl(var(--ring, 355 84% 47%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222.2 84% 4.9%))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bangla: ["var(--font-hind-siliguri)", "Noto Sans Bengali", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(16, 24, 40, 0.06), 0 2px 6px -2px rgba(16, 24, 40, 0.04)",
        "card-hover": "0 12px 30px -4px rgba(16, 24, 40, 0.12), 0 4px 10px -2px rgba(16, 24, 40, 0.06)",
        badge: "0 2px 8px rgba(215, 25, 32, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;