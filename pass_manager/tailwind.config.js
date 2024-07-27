/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: '#1A4D2E',
      },
      fontFamily: {
        'ubuntu' : ['Ubuntu', 'sans-serif']
      }
    },
  },
  plugins: [],
}

