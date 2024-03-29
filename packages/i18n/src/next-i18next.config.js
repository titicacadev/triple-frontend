/* eslint-disable import/no-absolute-path */
const path = require('path')

const { koCommonWeb } = require('./assets/ko/common-web')
const { enCommonWeb } = require('./assets/en/common-web')
const { jaCommonWeb } = require('./assets/ja/common-web')
const { zhTwCommonWeb } = require('./assets/zh-TW/common-web')

const LOCALE_PATH = './public/static/locales'

const koLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ko', 'local.json'))
    : require('/public/static/locales/ko/local.json')

const enLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'en', 'local.json'))
    : require('/public/static/locales/en/local.json')

const jaLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ja', 'local.json'))
    : require('/public/static/locales/ja/local.json')

const zhTwLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'zh-TW', 'local.json'))
    : require('/public/static/locales/zh-TW/local.json')

const resources = {
  ko: {
    local: koLocal,
    'common-web': koCommonWeb,
  },
  en: {
    local: enLocal,
    'common-web': enCommonWeb,
  },
  ja: {
    local: jaLocal,
    'common-web': jaCommonWeb,
  },
  'zh-TW': {
    local: zhTwLocal,
    'common-web': zhTwCommonWeb,
  },
}

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja', 'zh-TW'],
  },
  localePath:
    typeof window === 'undefined'
      ? path.resolve(LOCALE_PATH)
      : '/public/static/locales',
  defaultNS: 'local',
  serializeConfig: false,
  resources,
}
