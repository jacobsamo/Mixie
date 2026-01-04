import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      roboto: [
        "Roboto",
        "Helvetica Neue",
        "-apple-system",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
      ],
      monospace: ["monospace", "sans-serif", "-apple-system"],
      "sans-serif": ["sans-serif", "serif", "-apple-system"],
      "open-dyslexic": ["OpenDyslexic", "sans-serif"],
    },
    extend: {
      colors: {
        black: "hsl(222, 28% 7%)",
        grey: "hsl(224, 19% 12%)",
        white: "hsl(30, 36%, 96%)",
        blue: "#188FA7",
        yellow: "hsl(42, 100%, 54%)",
        peach: "hsl(351, 65%, 64%)",
        red: "hsl(355, 78%, 56%)",
      },
      fontSize: {
        "step--4": "0.82rem",
        "step--3": "1.02rem",
        "step--2": "1.28rem",
        "step--1": "1.6rem",
        step0: "2rem",
        step1: "2.50rem",
        step2: "3.13rem",
        step3: "3.91rem",
        step4: "4.88rem",
        step5: "6.10rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
