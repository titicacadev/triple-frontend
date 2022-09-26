/**
 * 아래 명령어로 이 스크립트를 실행하세요.
 * node ./node_modules/lerna/cli.js exec --ignore @titicaca/triple-frontend-docs --ignore=@titicaca/frontend-integration-test --parallel -- node "\$LERNA_ROOT_PATH/scripts/normalize-package-metadata.js"
 */
const fs = require('fs/promises')
const path = require('path')

normalizePackageMetadata()

async function normalizePackageMetadata() {
  const transformer = ({
    name,
    version,
    description,
    keywords,
    license,
    homepage,
    repository,
    bugs,
    scripts,
    main,
    types,
    files,
    directories,
    dependencies,
    devDependencies,
    peerDependencies,
    ...rest
  }) => ({
    name,
    version,
    description,
    keywords,
    license: 'MIT',
    homepage: makeHomepageUrl(name),
    repository: {
      type: 'git',
      url: 'git+https://github.com/titicacadev/triple-frontend.git',
    },
    bugs: {
      url: 'https://github.com/titicacadev/triple-frontend/issues',
    },
    main: 'lib/index.js',
    files: ['lib'],
    dependencies,
    devDependencies,
    peerDependencies,
    ...rest,
  })

  await writePackageJson(transformer)
}

function makeHomepageUrl(name) {
  return `https://github.com/titicacadev/triple-frontend/tree/main/packages/${name.replace(
    '@titicaca/',
    '',
  )}`
}

async function writePackageJson(transformer) {
  const packageJsonPath = path.resolve(process.cwd(), './package.json')

  const packageJson = JSON.parse(
    (await fs.readFile(packageJsonPath)).toString(),
  )

  const newPackageJson = JSON.stringify(transformer(packageJson), null, '  ')

  await fs.writeFile(packageJsonPath, newPackageJson)
}
