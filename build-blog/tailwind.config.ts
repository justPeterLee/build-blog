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
        "navbar-mode-btn": "rgba(var(--navbar-mode-btn))",
        "navbar-link-text": "rgba(var(--navbar-link-text))",
        "navbar-link-text-active": "rgba(var(--navbar-link-text-active))",

        card: "rgba(var(--card))",
        "code-card": "rgba(var(--code-card))",
        "tag-card": "rgba(var(--tag-card))",

        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-card": "rgba(var(--cta-card))",
        "cta-active-card": "rgba(var(--cta-active-card))",

        "text-box": "rgba(var(--text-box))",
        "text-box-active": "rgba(var(--text-box-active))",

        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rgba(var(--secondary-text))",
        "tertiary-text": "rgba(var(--tertiary-text))",
      },
    },
  },
  plugins: [],
};
export default config;
