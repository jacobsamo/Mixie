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
      black: '#111111',
      grey: '#373D45',
      blue: '#188FA7',
      off_white: '#F7FCFC',
      white: '#FAFFFE',
      yellow: '#FFC229',
      crimson: '#E63946',
      Github: '#161B22',
      Facebook: '#1877F2',
    },
  },
  plugins: [],
};
