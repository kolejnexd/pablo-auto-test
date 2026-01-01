import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00447C',
        'brand-accent': '#CC0000',
        'brand-secondary': '#FFFFFF',
        'text-dark': '#1A1A1A',
        'bg-light': '#F5F5F5'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
