import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0B",
        charcoal: "#151515",
        ivory: "#F4F0E9",
        champagne: "#C6A477",
        bronze: "#A77D58",
        beige: "#D8C9B9",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { luxe: "0.32em" },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        drift: { "0%,100%": { transform: "scale(1.08) translate3d(0,0,0)" }, "50%": { transform: "scale(1.14) translate3d(-1.5%,-1%,0)" } },
        scrollcue: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(200%)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        drift: "drift 24s ease-in-out infinite",
        scrollcue: "scrollcue 2.2s cubic-bezier(.6,0,.3,1) infinite",
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
