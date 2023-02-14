/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito','Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        gray: {
          50: "#FCFCFC",
          100: "#E1E1E6",
          200: "#C4C4CC",
          400: "#7C7C8A",
          900: "#121214",

        },
        purple: {
          300: "#8787B4",
          900: "#574476"
        }
      },
    },
  },
  plugins: [],
}
