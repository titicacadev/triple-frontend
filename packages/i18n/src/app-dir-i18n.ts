import path from 'path'

import i18next, { i18n, InitOptions, Namespace, ResourceKey } from 'i18next'

let i18nInstance: i18n | null = null

export interface I18nConfigParams {
  lang: string
  namespace: Namespace
}

export type Language = 'ko' | 'en' | 'zh' | 'ja'

export const FALLBACK_LANGUAGE = 'ko'
export const LANGUAGES = [FALLBACK_LANGUAGE, 'en', 'ja', 'zh']
export const DEFAULT_NAMESPACE = 'local'
export const LANGUAGE_COOKIE_NAME = 'LANGUAGE'

function getI18nResource(language: Language): ResourceKey {
  const LOCALE_PATH = './public/static/locales'

  return typeof window === 'undefined'
    ? require(path.resolve(LOCALE_PATH, language, 'local.json'))
    : require(`/public/static/locales/${language}/local.json`)
}

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
    acc[lang].local = getI18nResource(lang)

    return acc
  }, initialResources)
}

export function getOptions({
  lang = FALLBACK_LANGUAGE,
  namespace = DEFAULT_NAMESPACE,
}: Partial<I18nConfigParams> = {}): InitOptions {
  return {
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANGUAGE,
    lng: lang,
    ns: namespace,
    defaultNS: DEFAULT_NAMESPACE,
    resources: constructResources(LANGUAGES as Language[]),
  }
}

export function initializeI18n() {
  if (i18nInstance !== null) {
    return i18nInstance
  }

  const newInstance = i18next.createInstance()
  newInstance.init({ ...getOptions() })
  i18nInstance = newInstance
  return newInstance
}

export function getTranslation({
  lang,
  namespace,
}: {
  lang: string
  namespace: string
}) {
  const instance = initializeI18n()
  return instance.getFixedT(lang, namespace)
}
