const path = require('path')
const fs = require('fs')

const prettier = require('prettier')

const INCLUDED_FOR_BUILD = ['src/**/*', 'src/**/*.json', '../../global.d.ts']
const EXCLUDED_FOR_BUILD = [
  'lib',
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.stories.*',
]

function dependenciesToReferences(deps) {
  if (!deps) {
    return []
  }
  return Object.keys(deps)
    .filter((packageName) => packageName.startsWith('@titicaca/'))
    .map((packageName) =>
      path.relative(
        process.cwd(),
        path.join(
          process.env.LERNA_ROOT_PATH,
          './packages',
          packageName.replace('@titicaca/', ''),
        ),
      ),
    )
    .filter((packagePath) => fs.existsSync(packagePath))
    .map((path) => ({ path }))
}

const {
  dependencies,
  devDependencies,
  peerDependencies,
} = require(path.resolve(process.cwd(), './package.json'))

const references = [
  ...dependenciesToReferences(dependencies),
  ...dependenciesToReferences(devDependencies),
  ...dependenciesToReferences(peerDependencies),
].sort()

async function main() {
  const buildTsconfig = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      outDir: './lib',
      rootDir: 'src',
    },
    include: INCLUDED_FOR_BUILD,
    exclude: EXCLUDED_FOR_BUILD,
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
