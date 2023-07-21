/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/frontend',
    '@titicaca/eslint-config-triple/prettier',
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['*.test.*', '*.spec.*'],
      extends: [
        'plugin:jest/style',
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
    },
  ],
}
