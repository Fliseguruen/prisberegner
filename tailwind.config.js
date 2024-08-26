/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "main": "#00263D",
        "accent": "#FF9B00"
      },
      fontFamily: {
        pixel: ["Pixelify Sans", "sans-serif"]
      },
      screens: {
        lg: '1146px', // Opdaterer `lg` breakpoint til 1146px
      }
    }
  },
  plugins: []
}