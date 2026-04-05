/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter Tight'", "sans-serif"]
      },
      colors: {
        ink: "#0b0f1a",
        glass: "rgba(255, 255, 255, 0.08)",
        accent: "#3dd1c9",
        accent2: "#ff8a5b"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(61, 209, 201, 0.35)"
      }
    }
  },
  plugins: []
};
