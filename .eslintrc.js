/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/frontend',
    'plugin:jest/style',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:storybook/recommended',
    '@titicaca/eslint-config-triple/prettier',
  ],
}
