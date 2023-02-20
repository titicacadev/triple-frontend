import '@titicaca/next-i18next'
import { I18nCommonWebKeys } from '@titicaca/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common-web'
    resources: {
      'common-web': I18nCommonWebKeys
    }
  }
}
