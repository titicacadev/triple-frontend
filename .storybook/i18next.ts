import i18n from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

const supportedLngs = ['ko', 'ja', 'zh-TW']
const ns = ['triple-frontend']
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {}
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../packages/i18n/src/locales/${lng}`).default,
    }
  })
  return acc
}, {})

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ko',
  supportedLngs,

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
