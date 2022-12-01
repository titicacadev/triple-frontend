#! /usr/bin/env node
/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

import fetch from 'node-fetch'
import { program } from 'commander'

const WEB_ASSETS_URL = 'https://assets.triple.guide'

program
  .action(async () => {
    const languages = ['ko', 'ja', 'zh-TW']
    const packageJson = readFileSync('package.json', { encoding: 'utf-8' })
    const { version: packageVersion }: { version: string | undefined } =
      JSON.parse(packageJson)

    if (!packageVersion) {
      throw new Error('package.json에 버전을 명시해 주세요.')
    }

    for (const language of languages) {
      const filePath = `public/static/locales/${packageVersion}/${language}`

      const response = await fetch(
        `${WEB_ASSETS_URL}/locales/${language}/common-web.json`,
      )

      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true })
      }

      const locales = await response.arrayBuffer()
      writeFileSync(`${filePath}/common-web.json`, Buffer.from(locales))
    }
  })
  .parse()
