const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#130E30",
      },
      fontFamily: {
        sans: ["Avenir", ...defaultTheme.fontFamily.sans],
        secondary: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
