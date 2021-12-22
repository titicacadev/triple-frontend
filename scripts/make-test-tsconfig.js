#!/usr/bin/env node

/**
 * 테스트 코드 실행에 사용하는 tsconfig 파일을 생성하는 모듈입니다.
 * 현재 존재하는 패키지를 paths에 명시합니다.
 */
const fs = require('fs/promises')
const path = require('path')

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

function getPackages() {
  return fs.readdir('./packages')
}

function packagesToPaths(packages) {
  return packages.reduce(
    (paths, packageName) => ({
      ...paths,
      [`@titicaca/${packageName}`]: [`${packageName}/src`],
    }),
    {},
  )
}

async function writeTsconfig(transformer) {
  const tsconfigPath = path.resolve(process.cwd(), './tsconfig.test.json')

  const tsconfig = JSON.parse((await fs.readFile(tsconfigPath)).toString())

  const newTsconfig = transformer(tsconfig)
  const fileContent = `${JSON.stringify(newTsconfig, null, '  ')}\n`
  const prettified = prettier.format(fileContent, { parser: 'json' })

  await fs.writeFile(tsconfigPath, prettified)
}
