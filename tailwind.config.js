/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      xs: '420px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
