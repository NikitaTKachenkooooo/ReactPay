/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '70': '70%',
      },
      gap: {
        '103': '103px',
      },
      minWidth: {
        '1280': '1280px',
      },
      padding: {
        '4': '16px',
      },
    },
  },
  plugins: [],
}