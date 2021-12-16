module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainGreen: '#48B8AC',
        mainRed: '#DA6866',
        mainBg: '#fbf8f3',
      },
      fontFamily: {
        display: 'Poppins'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
