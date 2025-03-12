/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Changed to light green
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#059669',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F3F4F6',
          foreground: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};