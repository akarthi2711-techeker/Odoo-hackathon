/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8A00',
        secondary: '#FFB347',
        success: '#10B981',
        danger: '#EF4444',
        dark: '#0F172A',
        bg: '#F8FAFC'
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
