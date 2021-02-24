const path = require('path')
const fs = require('fs')

const prettier = require('prettier')

async function main() {
  const tsconfig = await fs.promises.readFile(
    path.resolve(process.cwd(), './tsconfig.json'),
  )
  const { references, ...rest } = JSON.parse(tsconfig)
  const buildTsconfig = {
    ...rest,
    exclude: ['node_modules', 'lib', '**/*.test.*', '**/*.spec.*'],
    references: references
      ? references.map(({ path }) => ({
          path: `${path}/tsconfig.build.json`,
        }))
      : undefined,
  }

  await fs.promises.writeFile(
    path.resolve(process.cwd(), './tsconfig.build.json'),
    prettier.format(JSON.stringify(buildTsconfig, null, '  '), {
      parser: 'json',
    }),
    { encoding: 'utf8' },
  )
}

main()
