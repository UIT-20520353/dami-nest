/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'calc-100vh': 'calc(100vh - 144px)'
      }
    }
  },
  plugins: []
};
