import type { Config } from "tailwindcss";

const eslint_safe_config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
        },
        accent: {
          DEFAULT: "var(--accent)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        neutral: {
          900: "var(--neutral-900)",
          600: "var(--neutral-600)",
          100: "var(--neutral-100)",
        },
        white: "var(--white)",
      },
      scale: {
        '103': '1.03',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        accent: ["var(--font-playfair)", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 15px rgba(16, 185, 129, 0)" },
          "100%": { transform: "scale(0.8)", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-ring": "pulseRing 2s infinite cubic-bezier(0.66, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
export default eslint_safe_config;
