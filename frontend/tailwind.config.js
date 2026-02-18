/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wood-light': '#F5E6D3',
        'wood-medium': '#D4A574',
        'wood-dark': '#8B4513',
        'wood-walnut': '#5C3A1E',
        'wood-oak': '#C8A96E',
        'wood-pine': '#DEB887',
        'wood-mahogany': '#C04000',
        'wood': {
          50: '#FEFDF9',
          100: '#F5E6D3',
          200: '#E8D1B8',
          300: '#D4A574',
          400: '#C19660',
          500: '#8B4513',
          600: '#703610',
          700: '#5C3A1E',
          800: '#4A2F1A',
          900: '#362415',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wood-grain': 'woodGrain 20s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        woodGrain: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
