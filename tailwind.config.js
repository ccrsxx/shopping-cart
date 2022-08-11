/** @type {import('tailwindcss').Config} */
const { red, blue, neutral } = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
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
      },
      animation: {
        fade: 'fade 300ms ease-in-out'
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
  plugins: [
    ({ addVariant }) => {
      addVariant('inner', '& > *');
    }
  ]
};
