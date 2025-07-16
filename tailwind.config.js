/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5016',
          light: '#4A7C2A',
          dark: '#1A300C',
        },
        secondary: {
          DEFAULT: '#7CB342',
          light: '#9CCC65',
          dark: '#558B2F',
        },
        accent: {
          DEFAULT: '#FFA726',
          light: '#FFB74D',
          dark: '#FF9800',
        },
        surface: '#FFFFFF',
        background: '#F5F7F3',
        sage: '#F5F7F3',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}