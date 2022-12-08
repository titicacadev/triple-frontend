import '@titicaca/next-i18next'
import commonWebAsset from '../../../i18n-assets/ko/common-web.json'

export type I18nCommonWebKeys = typeof commonWebAsset

declare module 'i18next' {
  interface CustomTypeOptions {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    defaultNS: 'common-web'
    resources: {
      'common-web': I18nCommonWebKeys
    }
  }
}
