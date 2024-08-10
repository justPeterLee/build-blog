import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "rgba(var(--background))",

        navbar: "rgba(var(--navbar))",
        "navbar-active": "rgba(var(--navbar-active))",
        "navbar-cta": "rgba(var(--navbar-cta))",

        card: "rgba(var(--card))",

        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",

        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rbga(var(--secondary-text))",
      },
    },
  },
  plugins: [],
};
export default config;
