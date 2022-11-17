/* eslint-disable import/no-absolute-path */
const path = require('path')

const LOCALE_PATH = './public/static/locales'

const koLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ko', 'local.json'))
    : require('/public/static/locales/ko/local.json')

const koCommon =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ko', 'common-web.json'))
    : require('/public/static/locales/ko/common-web.json')

const jaLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ja', 'local.json'))
    : require('/public/static/locales/ja/local.json')

const jaCommon =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ja', 'common-web.json'))
    : require('/public/static/locales/ja/common-web.json')

const twLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'zh-TW', 'local.json'))
    : require('/public/static/locales/zh-TW/local.json')

const twCommon =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'zh-TW', 'common-web.json'))
    : require('/public/static/locales/zh-TW/common-web.json')

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
  localePath:
    typeof window === 'undefined'
      ? path.resolve(LOCALE_PATH)
      : '/public/static/locales',
  defaultNS: 'local',
  serializeConfig: false,
  resources,
}
