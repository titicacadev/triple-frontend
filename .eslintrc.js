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
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      settings: {
        'import/resolver': {
          typescript: {
            project: 'packages/*/tsconfig.json',
          },
        },
      },
    },
  ],
}
