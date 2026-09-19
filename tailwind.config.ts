import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#708D81", 
          hover: "#5C7568",
        },
        secondary: "#F4D58D", 
        accent: {
          DEFAULT: "#BF0603", 
          dark: "#8D0801", 
        },
        bg: {
          DEFAULT: "#001427", 
        },
        surface: {
          DEFAULT: "#0B2136",
          hover: "#153247",
        },
        border: {
          DEFAULT: "#1E3A4C",
        },
        text: {
          primary: "#F2F6F3",
          secondary: "#9DB3A8",
          muted: "#5E7268",
        },
        success: "#7FAF89",
        warning: "#F4D58D",
        error: "#BF0603",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "heart-pop": {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.45)" },
          "60%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(10px, -18px) scale(1.05)" },
        },
        "float-slow-reverse": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-14px, 14px) scale(1.08)" },
        },
        "underline-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(127, 175, 137, 0.45)" },
          "100%": { boxShadow: "0 0 0 8px rgba(127, 175, 137, 0)" },
        },
        "mascot-blink": {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "96%": { transform: "scaleY(0.1)" },
        },
        "mascot-wave": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-18deg)" },
        },
        "mascot-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "bubble-pop": {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(6px)" },
          "70%": { opacity: "1", transform: "scale(1.05) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "petal-fall": {
          "0%": { transform: "translate3d(0, -12%, 0) rotate(0deg) scale(0.85)", opacity: "0" },
          "10%": { opacity: "1" },
          "45%": { transform: "translate3d(-16px, 45vh, 0) rotate(150deg) scale(1)" },
          "90%": { opacity: "1" },
          "100%": { transform: "translate3d(28px, 110vh, 0) rotate(340deg) scale(0.9)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.55s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.8s linear infinite",
        "heart-pop": "heart-pop 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "float-slow-reverse": "float-slow-reverse 11s ease-in-out infinite",
        "underline-grow": "underline-grow 0.25s ease-out",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
        "mascot-blink": "mascot-blink 4.5s ease-in-out infinite",
        "mascot-wave": "mascot-wave 1.4s ease-in-out infinite",
        "mascot-bob": "mascot-bob 3s ease-in-out infinite",
        "bubble-pop": "bubble-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        "petal-fall": "petal-fall linear infinite",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(112,141,129,0.28) 0%, rgba(0,20,39,0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
