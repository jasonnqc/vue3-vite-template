module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:@intlify/vue-i18n/recommended',
    '@vue/eslint-config-typescript/recommended',
    './.eslintrc-auto-import.json',
  ],
  plugins: ['vue', 'prettier', 'simple-import-sort'],
  settings: {
    'vue-i18n': {
      localeDir: 'src/locales/*.{json,json5,yaml,yml}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
  rules: {
    'object-shorthand': ['error', 'always'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'error',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
    '@typescript-eslint/consistent-type-imports': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'error',
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        // https://github.com/intlify/vue-i18n-next/issues/829
        ignores: ['i18n-t'],
      },
    ],
    // https://eslint.vuejs.org/rules/component-tags-order.html
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    // https://eslint-plugin-vue-i18n.intlify.dev/rules/#recommended
    '@intlify/vue-i18n/no-v-html': 'off',
    '@intlify/vue-i18n/no-html-messages': 'off',
    '@intlify/vue-i18n/no-missing-keys': 'error',
    '@intlify/vue-i18n/valid-message-syntax': 'error',
    '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
    '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
    '@intlify/vue-i18n/key-format-style': ['error', 'camelCase'],
  },
  overrides: [
    {
      files: ['src/{layouts,pages}/**/*.vue', 'src/components/base/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['src/locales/*.json'],
      extends: ['plugin:@intlify/vue-i18n/base'],
    },
    {
      files: ['*.js', '*cjs', '*.ts', '*.vue'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Node.js built-ins prefixed with `node:`.
              ['^node:'],
              // Vue or Vite related packages.
              ['^vue', '^vite', '^@?\\w'],
              // Side effect imports.
              ['^\\u0000'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              ['^'],
              // Parent imports.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Relative imports, anything that starts with a dot.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // File imports.
              ['^.+\\.(json|json5|css|scss)$'],
            ],
          },
        ],
      },
    },
  ],
};
