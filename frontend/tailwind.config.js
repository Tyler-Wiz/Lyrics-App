/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwind-scrollbar-hide")],
  extend: {
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(500px)", opacity: "0" },
        "100% ": { transform: "translateX(0)", opacity: "1" },
      },
    },
    animation: {
      slide: "slideIn 500ms ease-in-out",
    },
  },
  darkMode: "class",
  theme: {
    fontFamily: {
      Lato: ["Lato"],
      Poppins: ["Poppins", "san serif"],
      Crimson: ["Crimson+Pro"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#0A0C0E",
      primary: "#eef2f7",
      secondary: "#e2e6ea",
      navbackground: "#ffffff",
      lightBlack: "#8A8A8A",
      lightGrey: "#969BA033",
      accentColor: "#2C67A8",
      error: "#A30000",
      dashBackground: "#f8f3f7",
      dashHover: "#f8f3f7ff",
    },
  },
  plugins: [],
};
