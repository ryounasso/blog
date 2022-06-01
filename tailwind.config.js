module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphism: "2px 2px 15px 2px #cacaca, -2px -2px 15px 1px #ffffff",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  darkMode: "class",
};
