/** @type {import('tailwindcss').Config} */
const { blue } = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        accent: blue['400'],
        dark: '#1a1a1a',
        grayish: '#b6bbb6'
      },
      animation: {
        fade: 'fade 500ms ease-in-out'
      },
      keyframes: {
        fade: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }
    }
  },
  plugins: []
};
