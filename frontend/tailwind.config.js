/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "576px",
        md: "768px",
      },
      blur: {
        xs: "2px",
      },
    },
    container: {
      center: true,
      padding: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "5rem",
      },
    },
  },
  plugins: [],
};
