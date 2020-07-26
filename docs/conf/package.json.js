const fsPromises = require('fs').promises

const packageJSON = require('../package.json')

async function main() {
  for (const key in packageJSON.dependencies) {
    if (key.indexOf('@titicaca/') === 0) {
      packageJSON.dependencies[key] = 'latest'
    }
  }

  await fsPromises.writeFile(
    'package.json',
    JSON.stringify(packageJSON, null, '  '),
    { encoding: 'utf8' },
  )
}

main()
