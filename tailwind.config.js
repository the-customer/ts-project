/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

console.log(process.env.NODE_ENV )

