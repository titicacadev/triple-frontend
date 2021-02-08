const util = require('util')
const path = require('path')
const fsPromises = require('fs').promises
const exec = util.promisify(require('child_process').exec)

const packageJSON = require('../package.json')

const [TAG_NAME = 'latest'] = process.argv.slice(2)

async function main() {
  const { stdout } = await exec('npx lerna list --json')
  let packageList

  try {
    packageList = JSON.parse(stdout)
  } catch (ignored) {
    packageList = null
  }

  const tfVersion = /v[12].[0-9]+.[0-9]+/g.test(TAG_NAME)
    ? TAG_NAME.substr(1)
    : TAG_NAME === 'release-canary'
    ? 'canary'
    : 'latest'

  if (packageList) {
    packageList.forEach(({ name }) => {
      if (packageJSON.dependencies[name]) {
        packageJSON.dependencies[name] = tfVersion
      }
    })
  } else {
    for (const key in packageJSON.dependencies) {
      if (key.indexOf('@titicaca/') === 0) {
        packageJSON.dependencies[key] = tfVersion
      }
    }
  }

  await fsPromises.writeFile(
    path.resolve(__dirname, '../package.json'),
    `${JSON.stringify(packageJSON, null, '  ')}

    `,
    { encoding: 'utf8' },
  )
}

main()
