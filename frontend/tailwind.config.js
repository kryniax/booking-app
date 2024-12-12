/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        default: "1rem",
        sm: "1rem",
        md: "5rem",
        lg: "10rem",
      },
    },
  },
  plugins: [],
};
