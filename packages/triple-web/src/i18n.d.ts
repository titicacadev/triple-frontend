import 'i18next'
import { I18nKeys } from '@titicaca/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      'triple-frontend': I18nKeys
    }
  }
}
