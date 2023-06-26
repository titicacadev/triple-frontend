export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'zh-TW'
export type Namespace = 'local' | 'common-web' | 'common-admin'
export interface LangParams {
  params: {
    lang: Language
  }
}
