/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "#F04438",
        warning: "#F79009",
        success: "#12B76A",
      },
    },
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xll: "1440px",

      "3xl": "1920px",
    },
  },
  plugins: [],
};
