const fsPromises = require('fs').promises

const packageJSON = require('../package.json')

const [TAG_NAME = 'latest'] = process.argv.slice(2)

async function main() {
  const tfVersion = /v[12].[0-9]+.[0-9]+/g.test(TAG_NAME)
    ? TAG_NAME.substr(1)
    : TAG_NAME === 'release-canary'
    ? 'canary'
    : 'latest'

  for (const key in packageJSON.dependencies) {
    if (key.indexOf('@titicaca/') === 0) {
      packageJSON.dependencies[key] = tfVersion
    }
  }

  await fsPromises.writeFile(
    'package.json',
    `${JSON.stringify(packageJSON, null, '  ')}

    `,
    { encoding: 'utf8' },
  )
}

main()
