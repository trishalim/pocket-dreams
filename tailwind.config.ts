/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-fraunces)"],
        sans: ["var(--font-roboto-mono)"],
      },
      colors: {
        purple: {
          ...colors.purple,
          950: "#211f5a",
          1000: "#171730",
        },
      },
    },
  },
  plugins: [],
};
