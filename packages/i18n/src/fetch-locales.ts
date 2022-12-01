#! /usr/bin/env node
/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

import fetch from 'node-fetch'
import { program } from 'commander'

const WEB_ASSETS_URL = 'https://assets.triple.guide'

const languages = ['ko', 'ja', 'zh-TW']

program
  .action(async () => {
    const packageJson = readFileSync('package.json', { encoding: 'utf-8' })
    console.log(packageJson)
    for (const language of languages) {
      const filePath = `public/static/locales/${language}`

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
