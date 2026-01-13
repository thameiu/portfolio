/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#334A52',
        secondary: '#59C3F0',
        accent: '#8DE1FD',
        light: '#C5EFFD',
      },
    },
  },
  plugins: [],
}