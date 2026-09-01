/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        'bg-base':    '#F5F5F7',
        'text-primary':   '#1D1D1F',
        'text-secondary': '#86868B',
        'text-muted':     '#A1A1A6',

        // Apple System Accents
        'apple-blue':   '#007AFF',
        'apple-orange': '#FF9500',
        'apple-green':  '#34C759',
        'apple-red':    '#FF3B30',
        'apple-purple': '#AF52DE',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'apple': '0 4px 24px rgba(0,0,0,0.04)',
        'apple-hover': '0 8px 32px rgba(0,0,0,0.08)',
      },
      animation: {
        'sonar-expand': 'sonar-expand 3s cubic-bezier(0.1, 0.7, 0.1, 1) forwards',
      },
      keyframes: {
        'sonar-expand': {
          '0%': { width: '0px', height: '0px', opacity: '1', borderWidth: '8px' },
          '100%': { width: '1200px', height: '1200px', opacity: '0', borderWidth: '1px' },
        }
      }
    },
  },
  plugins: [],
};
