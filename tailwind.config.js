/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#378ADD',
        brandGreen: '#639922',
        brandAmber: '#EF9F27',
        brandRed: '#E24B4A',
        brandPurple: '#7F77DD',
        cardBg: '#F1EFE8',
        cardBorder: '#E5E3DA',
        textPrimary: '#2C2C2A',
        textSecondary: '#5F5E5A'
      }
    },
  },
  plugins: [],
}
