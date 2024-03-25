/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'apply-btn-bg-color': '#EDCD44',
        'apply-btn-hover-color': '#DC3E26',
      },
    },
  },
  plugins: [],
}
