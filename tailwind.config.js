/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      "xs": "320",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
    colors: {
      black: '#131313',
      grey: '#373D45',
      dark_blue: '#1D3557',
      blue: '#457D9D',
      light_blue: '#A8DADC',
      off_white: '#F1FAEE',
      white: '#F8FBEE',
      gold: '#FFC229',
      crimson: '#E63946',
    },
  },
  plugins: [],
};
