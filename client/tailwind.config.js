/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        raised: "0 4px 8px rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [],
};
