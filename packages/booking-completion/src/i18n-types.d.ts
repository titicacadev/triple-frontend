import '@titicaca/next-i18next'
import { I18nKeys } from '../../i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    defaultNS: 'common-web'
    resources: {
      'common-web': I18nKeys
    }
  }
}
