/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/frontend',
    'plugin:storybook/recommended',
    '@titicaca/eslint-config-triple/prettier',
  ],
}
