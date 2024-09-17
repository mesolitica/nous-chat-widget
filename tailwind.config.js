/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  prefix: "ns-",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        chatbox:
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);",
      },
      animation: {
        bounce: "bounce 0.8s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        h1: { fontSize: "1.2rem" },
        h2: { fontSize: "1.0rem" },
        h3: { fontSize: "0.7rem" },
      });
    }),
  ],
};
