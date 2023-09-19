import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
        ubuntu: ['Ubuntu', ...fontFamily.sans],
        merriweather: ['Merriweather', ...fontFamily.serif],
        'roboto-mono': ['Roboto Mono', ...fontFamily.sans],
        'roboto-slab': ['Roboto Slab', ...fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config;
