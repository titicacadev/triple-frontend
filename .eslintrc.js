/** @type import('eslint').Linter.Config */
module.exports = {
  extends: [
    '@titicaca/eslint-config-triple',
    '@titicaca/eslint-config-triple/frontend',
    '@titicaca/eslint-config-triple/prettier',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
}
