const namingConvention = require('@titicaca/eslint-config-triple/rules/typescript/naming-convention')

const excludes = [...namingConvention.commonExcludes]
const regex = `^(${excludes.join('|')})$`

module.exports = {
  rules: {
    '@typescript-eslint/naming-convention': namingConvention.getRules({
      regex,
    }),
  },
}
