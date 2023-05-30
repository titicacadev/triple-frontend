/* eslint-disable import/no-absolute-path */
import { InitOptions, Namespace, ResourceKey } from 'i18next'

export type Language = 'ko' | 'en' | 'ja' | 'zh'

export interface I18nConfigParams {
  lang: string
  namespace: Namespace
}

export const fallbackLanguage = 'ko'
export const languages: Language[] = [fallbackLanguage, 'en', 'ja', 'zh']
export const defaultNamespace = 'local'

function constructResources(languages: Language[]) {
  const initialResources = {
    ko: {
      local: {},
    },
    en: {
      local: {},
    },
    ja: {
      local: {},
    },
    zh: {
      local: {},
    },
  }

  return languages.reduce((acc, lang) => {
    acc[lang].local =
      require(`/public/static/locales/${lang}/local.json`) as ResourceKey
    return acc
  }, initialResources)
}

export function getOptions({
  lang = fallbackLanguage,
  namespace = defaultNamespace,
}: Partial<I18nConfigParams> = {}): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng: fallbackLanguage,
    lng: lang,
    ns: namespace,
    defaultNS: defaultNamespace,
    resources: constructResources(languages),
  }
}
