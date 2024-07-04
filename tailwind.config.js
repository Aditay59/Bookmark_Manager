/** @type {import('tailwindcss').Config} */
import textShadowPlugin from 'tailwindcss-textshadow';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    textShadowPlugin
  ],
}