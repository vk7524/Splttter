/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2sm' : '360px',
        '3xl': '1920px', 
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0.625rem', 
          sm: '0.625rem',
          lg: '3rem',
          xl: '4rem',
              
        },
      },
      fontFamily: {
        'chau-philomene': ['"Chau Philomene One"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}