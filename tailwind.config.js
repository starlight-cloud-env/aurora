/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#121417',
        surface: '#191d22',
        surface2: '#222831',
        border: '#2d343c',
        text: '#f6f7fb',
        soft: '#a5afba',
        muted: '#78818b',
        accent: '#7286ff',
      },
      borderRadius: {
        lg: '18px',
      },
      boxShadow: {
        md: '0 12px 40px rgba(0,0,0,.3)',
      },
    },
  },
  plugins: [],
}
