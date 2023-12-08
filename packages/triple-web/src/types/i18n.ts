import { i18n as I18nInstance } from 'i18next'

export interface I18nValue {
  i18n: I18nInstance
  lang: string | undefined
}
