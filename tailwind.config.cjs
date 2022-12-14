/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.vue"],
   darkMode: "class",
   theme: {
      extend: {},
   },
   plugins: [require("@headlessui/tailwindcss")],
}
