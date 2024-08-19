export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config',
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'property-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': null,
    'scss/load-no-partial-leading-underscore': null,

    // 允许驼峰命名的函数
    'function-name-case': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'v-bind',
          'map-get',
          'lighten',
          'darken',
          'getCssVar',
          'selectortostring',
          'str-slice',
          'inspect',
          'joinvarname',
          'if',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [
          '/^view-transition/',
        ],
      },
    ],
    'scss/double-slash-comment-empty-line-before': null,
    'scss/no-global-function-names': null,
    'scss/dollar-variable-pattern': null,
    'scss/operator-no-newline-after': null,
    'scss/at-function-pattern': null,
    '@stylistic/max-line-length': null,
    '@stylistic/block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
  },
  allowEmptyInput: true,
  ignoreFiles: [
    'node_modules/**/*',
    'packages/**/node_modules/**/*',
    'dist*/**/*',
    'docs*/**/*',
  ],
}
