/* eslint-disable import/no-absolute-path */
const path = require('path')

const { koCommonWeb } = require('./assets/ko/common-web')
const { jaCommonWeb } = require('./assets/ja/common-web')
const { zhCommonWeb } = require('./assets/zh/common-web')

const LOCALE_PATH = './public/static/locales'

const koLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ko', 'local.json'))
    : require('/public/static/locales/ko/local.json')

const jaLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'ja', 'local.json'))
    : require('/public/static/locales/ja/local.json')

const zhLocal =
  typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, 'zh', 'local.json'))
    : require('/public/static/locales/zh/local.json')

const resources = {
  ko: {
    local: koLocal,
    'common-web': koCommonWeb,
  },
  ja: {
    local: jaLocal,
    'common-web': jaCommonWeb,
  },
  zh: {
    local: zhLocal,
    'common-web': zhCommonWeb,
  },
}

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'ja', 'zh'],
  },
  localePath:
    typeof window === 'undefined'
      ? path.resolve(LOCALE_PATH)
      : '/public/static/locales',
  defaultNS: 'local',
  serializeConfig: false,
  resources,
}
