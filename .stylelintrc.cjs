module.exports = {
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'prettier/prettier': true,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-block-trailing-semicolon': null,
    'value-keyword-case': null,
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['/^v-/', 'pseudo-element'] },
    ],
    'scss/no-global-function-names': null,
    'scss/operator-no-newline-after': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'layer', 'variants', 'responsive', 'screen'],
      },
    ],
  },
  ignoreFiles: ['node_modules/**', 'src/**/vendors/**'],
};
