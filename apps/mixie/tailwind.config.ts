import { withUt } from "uploadthing/tw";
import { type Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      colors: {
        black: "hsl(222, 28% 7%)",
        grey: "hsl(224, 19% 12%)",
        white: "hsl(30, 36%, 96%)",
        blue: "#188FA7",
        yellow: "hsl(42, 100%, 54%)",
        peach: "hsl(351, 65%, 64%)",
        red: "hsl(355, 78%, 56%)",
      },
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
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      main: "0px 0px 20px rgba(0, 0, 0, 0.25)",
      DEFAULT: "0px 0px 20px rgba(0, 0, 0, 0.25)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      none: "none",
      searchBarShadow: "17px 21px 17px rgba(0, 0, 0, 0.25)",
    },
    screens: {
      xs: "320",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
  },
} satisfies Config;

export default withUt(config);
