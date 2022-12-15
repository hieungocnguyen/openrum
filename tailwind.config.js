/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   darkMode: "class",
   theme: {
      extend: {
         colors: {
            "light-primary": "#DBFC3C",
            "dark-primary": "#171717",
            "dark-bg": "#2C2B2B",
            "secondary-pink": "#FFBCE5",
         },
      },
   },
   plugins: [require("@tailwindcss/line-clamp")],
};
