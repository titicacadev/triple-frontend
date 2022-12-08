import '@titicaca/next-i18next'
import { I18nCommonWebKeys } from '@titicaca/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    defaultNS: 'common-web'
    resources: {
      'common-web': I18nCommonWebKeys
    }
  }
}
