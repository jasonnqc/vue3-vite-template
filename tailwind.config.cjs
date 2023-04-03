/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    configViewer: {
      fonts:
        'https://fonts.googleapis.com/css2?family=Cormorant:wght@600&family=Cormorant+SC:wght@600&family=Cuprum:wght@400;700&family=Open+Sans:ital,wght@0,400;1,700&display=swap',
    },
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
      serif: ['Cormorant', 'serif'],
      'sans-extra': ['Cuprum', 'sans-serif'],
      'serif-extra': ['"Cormorant SC"', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      orange: {
        DEFAULT: '#ff6b00',
      },
      gold: {
        DEFAULT: '#dbc796',
      },
      yellow: {
        DEFAULT: '#ffa800',
      },
      gray: {
        DEFAULT: '#b3b3b3',
      },
      red: {
        DEFAULT: '#ff0000',
      },
      brown: {
        DEFAULT: '#7c4a1c',
      },
      green: {
        DEFAULT: '#219653',
      },
      career: {
        DEFAULT: '#893a01',
        light: '#ff6b00',
      },
      group: {
        DEFAULT: '#5c8bb8',
        light: '#56ccf2',
      },
      growth: {
        DEFAULT: '#316246',
        light: '#6fcf97',
      },
      engagement: {
        DEFAULT: '#662f7b',
        light: '#bb6bd9',
      },
      solo: {
        DEFAULT: '#bd4242',
        light: '#eb5757',
      },
    },
    extend: {
      width: {
        150: '37.5rem',
      },
      spacing: {
        full: '100%',
      },
      zIndex: {
        max: 9990,
        'max-1': 9991,
        'max-2': 9992,
        'max-3': 9993,
        'max-4': 9994,
        'max-5': 9995,
        'max-6': 9996,
        'max-7': 9997,
        'max-8': 9998,
        'max-9': 9999,
      },
      backgroundImage: {
        'linear-silver': 'linear-gradient(91.55deg, #8691a5 1.4%, #4a515e 99.28%)',
        'linear-gold': 'linear-gradient(90.41deg, #d6b45f 0.36%, #7a5e29 99.65%)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
