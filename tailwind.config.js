/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        accent: colors.pink['400'],
        dark: '#1a1a1a',
        grayish: '#b6bbb6',
        darkgray: 'hsla(0, 0%, 100%, 0.9)'
      }
    }
  },
  plugins: []
};
