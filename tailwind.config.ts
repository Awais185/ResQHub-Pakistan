import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#102A43',
        primary: '#1769AA',
        bright: '#258BCB',
        teal: '#13A89E',
        relief: '#15966B',
        bg: '#F4F8FC',
        ink: '#14243D',
        muted: '#63758B'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
export default config;
