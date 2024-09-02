/** @type {import('tailwindcss').Config} */
 
const plugin = require('tailwindcss/plugin');
module.exports = {
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    }
  }
,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
    backgroundImage:{
      "loging-background":'url("/background.avif")'
    },
    height:{
      "large-box":"200px"
    }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.hide-scrollbar': {
          /* Hide scrollbar for WebKit-based browsers (Chrome, Safari, etc.) */
          '-webkit-overflow-scrolling': 'touch',
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',     /* Firefox */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Hide scrollbar for WebKit-based browsers */
        },
      });
    }),


    plugin(({ addBase, theme }) => {
      addBase({
          '.scrollbar': {
              overflowY: 'auto',
              scrollbarWidth: 'thin', /* Firefox */
              scrollbarColor: `${theme('colors.gray.700')} ${theme('colors.gray.200')}`, /* Firefox */
          },
          '.scrollbar::-webkit-scrollbar': {
              height: '2px',
              width: '2px',
          },
          '.scrollbar::-webkit-scrollbar-thumb': {
              backgroundColor: theme('colors.gray.700'), /* Scrollbar color */
              borderRadius: '9999px', /* Fully rounded */
          },
          '.scrollbar::-webkit-scrollbar-track': {
              backgroundColor: theme('colors.gray.200'), /* Track color */
          },
          '.scrollbar::-webkit-scrollbar-button': {
              display: 'none', /* Hide up/down arrows */
          },
      });
  }),
  
],

  
}
