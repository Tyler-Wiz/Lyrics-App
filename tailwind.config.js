/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Lato: ["Lato"],
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
    },
  },
  plugins: [],
};
