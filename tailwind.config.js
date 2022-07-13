/** @type {import('tailwindcss').Config} */
const { red, blue, neutral } = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        accent: blue['400'],
        primary: 'white',
        secondary: '#b6bbb6',
        background: '#1a1a1a',
        'main-red': red['400'],
        'border-primary': neutral['700'],
        'border-secondary': neutral['400']
      }
    }
  },
  plugins: []
};
