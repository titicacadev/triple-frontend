const path = require('path')
const fsPromises = require('fs').promises

const packageJSON = require('../package.json')
const tsconfigJSON = require('../tsconfig.json')

const [TAG_NAME = 'latest'] = process.argv.slice(2)

async function main() {
  const packageList = tsconfigJSON.references.map(({ path }) =>
    path.replace('../packages/', '@titicaca/'),
  )

  const tfVersion = /v[12].[0-9]+.[0-9]+/g.test(TAG_NAME)
    ? TAG_NAME.substr(1)
    : TAG_NAME === 'release-canary'
    ? 'canary'
    : 'latest'

  await fsPromises.writeFile(
    path.resolve(__dirname, '../package.json'),
    `${JSON.stringify(
      {
        ...packageJSON,
        dependencies: Object.entries(packageJSON.dependencies).reduce(
          (result, [key, value]) => ({
            ...result,
            [key]: packageList.includes(key) ? tfVersion : value,
          }),
          {},
        ),
      },
      null,
      '  ',
    )}

    `,
    { encoding: 'utf8' },
  )
}

main()
