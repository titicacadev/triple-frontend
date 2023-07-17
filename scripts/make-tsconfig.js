const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const prettier = require('prettier')

main()

async function main() {
  const packages = await getPackages()

  const paths = packagesToPaths(packages)

  await writeTsconfig((prev) => ({
    ...prev,
    compilerOptions: { ...prev.compilerOptions, paths },
  }))
}

async function getPackages() {
  const packageNames = await new Promise((resolve, reject) => {
    exec('lerna list', (err, stdout) => {
      if (err) {
        reject(err)
      }

      resolve(
        stdout
          .split('\n')
          .filter((line) => !!line)
          .map((line) => line.replace('@titicaca/', '')),
      )
    })
  })

  return packageNames
}

function packagesToPaths(packages) {
  return packages.reduce(
    (paths, packageName) => ({
      ...paths,
      [`@titicaca/${packageName}`]: [`./packages/${packageName}/src`],
      ...createExportPath({
        packageName,
        filename: 'common',
        filePath: 'src/app-directory/common',
      }),
      ...createExportPath({
        packageName,
        filename: 'client',
        filePath: 'src/app-directory/client',
      }),
      ...createExportPath({
        packageName,
        filename: 'server',
        filePath: 'src/app-directory/server',
      }),
    }),
    {},
  )
}

async function writeTsconfig(transformer) {
  const tsconfigPath = path.resolve(process.cwd(), './tsconfig.test.json')

  const tsconfig = JSON.parse(
    (await fs.promises.readFile(tsconfigPath)).toString(),
  )

  const newTsconfig = transformer(tsconfig)
  const fileContent = `${JSON.stringify(newTsconfig, null, '  ')}\n`
  const prettified = prettier.format(fileContent, { parser: 'json' })

  await fs.promises.writeFile(tsconfigPath, prettified)
}

function createExportPath({ packageName, filename, filePath }) {
  const hasPath = fs.existsSync(
    path.relative(
      process.cwd(),
      path.join('./packages', packageName, filePath),
    ),
  )

  return hasPath
    ? {
        [`@titicaca/${packageName}/${filename}`]: [
          `./packages/${packageName}/${filePath}`,
        ],
      }
    : {}
}
