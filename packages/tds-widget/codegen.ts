import type { CodegenConfig } from '@graphql-codegen/cli'

const plugins = [
  'typescript',
  'typescript-operations',
  'typescript-generic-sdk',
]

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://triple-dev.titicaca-corp.com/api/graphql',
  generates: {
    'src/review/data/graphql/generated.ts': {
      documents: 'src/review/data/graphql/**/*.graphql',
      plugins,
    },
  },
  config: {
    documentMode: 'documentNode',
    enumsAsConst: true,
    namingConvention: {
      enumValues: 'keep',
    },
  },
}

export default config
