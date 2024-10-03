import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' }, // wrap opacity value in quotes
        '100%': { opacity: '1' }, // wrap opacity value in quotes
      },
    },
    animation: {
      fadeIn: 'fadeIn 2s ease-in-out',  // ensure the duration is a string
    },
  },
  plugins: [],
};
export default config;