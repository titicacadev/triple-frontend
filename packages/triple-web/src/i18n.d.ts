import { I18nCommonWebKeys } from '@titicaca/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      'common-web': I18nCommonWebKeys
    }
  }
}
