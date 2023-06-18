const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        main: ["Mulish", "sans-serif"],
        ...defaultTheme.fontFamily,
      },
      maxWidth: {
        "5/12": "41.666667%",
      },
    },
  },
  variants: {
    extend: {
      // Add the animation variant here:
      animation: ["responsive", "motion-safe", "motion-reduce"],
    },
  },
  plugins: [
    // Add your plugins here:
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
