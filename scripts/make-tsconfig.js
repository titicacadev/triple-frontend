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
      [`@titicaca/${packageName}/*`]: [
        `./packages/${packageName}/src/app-directory/*`,
      ],
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
