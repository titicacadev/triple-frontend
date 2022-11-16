/* eslint-disable import/no-commonjs */
/* eslint-disable sort-keys */
const path = require('path')

const LOCALE_PATH = './public/static/locales'

const koLocal = require(path.resolve(LOCALE_PATH, 'ko', 'local.json'))
const koCommon = require(path.resolve(LOCALE_PATH, 'ko', 'common-web.json'))
const jaLocal = require(path.resolve(LOCALE_PATH, 'ja', 'local.json'))
const jaCommon = require(path.resolve(LOCALE_PATH, 'ja', 'common-web.json'))
const twLocal = require(path.resolve(LOCALE_PATH, 'zh-TW', 'local.json'))
const twCommon = require(path.resolve(LOCALE_PATH, 'zh-TW', 'common-web.json'))

const resources = {
  ja: {
    local: jaLocal,
    'common-web': jaCommon,
  },
  ko: {
    local: koLocal,
    'common-web': koCommon,
  },
  'zh-TW': {
    local: twLocal,
    'common-web': twCommon,
  },
}

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'ja', 'zh-TW'],
  },
  localePath: path.resolve('./public/static/locales'),
  defaultNS: 'local',
  serializeConfig: false,
  resources,
}
