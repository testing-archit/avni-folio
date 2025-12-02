/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-rose': {
          50: '#fdf4f8',
          100: '#fce7f3',
          200: '#fbb6ce',
          300: '#f687b3',
          400: '#ed64a6',
          500: '#ec4899',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
          900: '#881337',
        },
        'rose-gold': {
          light: '#f4c2c2',
          DEFAULT: '#b76e79',
          dark: '#8b5a5e',
        }
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }
    },
  },
  plugins: [],
}

