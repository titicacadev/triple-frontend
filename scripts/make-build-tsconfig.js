const path = require('path')
const fs = require('fs')

const prettier = require('prettier')

async function main() {
  const tsconfig = {
    extends: '../../tsconfig.json',
    exclude: ['node_modules', 'lib'],
  }

  const buildTsconfig = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      outDir: './lib',
    },
    include: ['src/**/*'],
    exclude: [
      'node_modules',
      'lib',
      'src/**/*.test.*',
      'src/**/*.spec.*',
      'src/**/*.stories.*',
    ],
  }

  await fs.promises.writeFile(
    path.resolve(process.cwd(), './tsconfig.json'),
    prettier.format(JSON.stringify(tsconfig, null, '  '), {
      parser: 'json',
    }),
    { encoding: 'utf8' },
  )
  await fs.promises.writeFile(
    path.resolve(process.cwd(), './tsconfig.build.json'),
    prettier.format(JSON.stringify(buildTsconfig, null, '  '), {
      parser: 'json',
    }),
    { encoding: 'utf8' },
  )
}

main()
