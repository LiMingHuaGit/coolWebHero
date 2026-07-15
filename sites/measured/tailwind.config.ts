import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        instrument: ['Instrument Serif', 'serif'],
        helveticaNeue: ['Helvetica Neue Roman', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      zIndex: {
        55: '55',
      },
    },
  },
  plugins: [],
} satisfies Config;
