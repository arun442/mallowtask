/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    	fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
  	},
    extend: {},
  },
  plugins: [],
}