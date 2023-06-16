import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://triple-dev.titicaca-corp.com/api/graphql',
  documents: 'src/data/graphql/*.graphql',
  generates: {
    'src/data/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-generic-sdk',
      ],
    },
  },
  config: {
    documentMode: 'documentNode',
  },
}

export default config
