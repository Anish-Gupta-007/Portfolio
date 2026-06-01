/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Premium Dark Luxury Palette
        primary: {
          DEFAULT: "#000000", // Matte Black
          light: "#1A1A1A", // Deep Charcoal
        },
        accent: {
          gold: "#D4AF37", // Royal Gold
          blue: "#00F0FF", // Neon Blue
          purple: "#8A2BE2", // Electric Purple
        },
        text: {
          main: "#F5F5F7", // Soft White
          muted: "#A1A1AA", // Graphite
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
