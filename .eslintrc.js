/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/frontend',
    '@titicaca/eslint-config-triple/prettier',
  ],
}
