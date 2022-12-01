/* eslint-disable import/no-absolute-path */
const path = require('path')

const { koCommonWeb, jaCommonWeb, zhTwCommonWeb } = require('@titicaca/i18n')

const LOCALE_PATH = './public/static/locales'

const koLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ko', 'local.json'))
    : require('/public/static/locales/ko/local.json')

const jaLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ja', 'local.json'))
    : require('/public/static/locales/ja/local.json')

const twLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'zh-TW', 'local.json'))
    : require('/public/static/locales/zh-TW/local.json')

const resources = {
  ko: {
    local: koLocal,
    'common-web': koCommonWeb,
  },
  ja: {
    local: jaLocal,
    'common-web': jaCommonWeb,
  },
  'zh-TW': {
    local: twLocal,
    'common-web': zhTwCommonWeb,
  },
}

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'ja', 'zh-TW'],
  },
  localePath:
    typeof window === 'undefined'
      ? path.resolve(LOCALE_PATH)
      : '/public/static/locales',
  defaultNS: 'local',
  serializeConfig: false,
  resources,
}
