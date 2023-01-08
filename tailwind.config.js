/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      mobile: "0px",
      tablet: "720px",
      laptop: "1200px",
      desktop:"1450px"
    },
    fontFamily: {
			SG: ['"Space Grotesk"', 'sans-serif'],
			Inter: ['Inter', 'sans-serif'],
		},
    extend: {
      minHeight: {
        universal: "-webkit-fill-available"
      }
    },
  },
  plugins: [],
}
