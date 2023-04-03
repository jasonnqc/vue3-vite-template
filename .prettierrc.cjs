module.exports = {
  endOfLine: 'auto',
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
  plugins: [require('prettier-plugin-tailwindcss')],
};
