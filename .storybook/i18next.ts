import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

const supportedLngs = ['ko', 'ja', 'zh-TW']

i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../packages/i18n/src/locales/${language}`),
    ),
  )
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko',
    supportedLngs,

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
