const path = require('path')
const fs = require('fs')

const prettier = require('prettier')

const { dependencies, devDependencies } = require(path.resolve(
  process.cwd(),
  './package.json',
))

function dependenciesToPaths(deps) {
  if (!deps) {
    return {}
  }

  return Object.keys(deps)
    .filter((packageName) => packageName.startsWith('@titicaca/'))
    .filter((packageName) =>
      fs.existsSync(
        path.relative(
          process.cwd(),
          path.join(
            process.env.LERNA_ROOT_PATH,
            './packages',
            packageName.replace('@titicaca/', ''),
          ),
        ),
      ),
    )
    .reduce(
      (paths, packageName) => ({
        ...paths,
        [packageName]: [`../${packageName.replace('@titicaca/', '')}/src`],
      }),
      {},
    )
}

async function main() {
  const tsconfig = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      baseUrl: '.',
      paths: {
        ...dependenciesToPaths(dependencies),
        ...dependenciesToPaths(devDependencies),
      },
    },
    exclude: ['**/node_modules', 'lib'],
  }

  const buildTsconfig = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      outDir: './lib',
    },
    include: ['src/**/*'],
    exclude: [
      'node_modules',
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
