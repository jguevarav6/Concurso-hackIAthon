import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        clinical: "#2F9E7E",
        caution: "#D97706",
        danger: "#B42318"
      }
    }
  },
  plugins: []
};

export default config;
