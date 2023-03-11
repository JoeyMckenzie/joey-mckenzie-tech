const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,md,ts,svelte}'],
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
