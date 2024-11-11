export type I18nLocale = 'en' | 'ja' | 'ko' | 'zh-TW'

export interface I18nValue {
  defaultLocale: I18nLocale
  locale?: I18nLocale
}
