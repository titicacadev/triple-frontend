import { ComponentType } from 'react'
import i18next, { i18n, InitOptions, Namespace } from 'i18next'

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
    acc[lang].local = require(`/public/static/locales/${lang}/local.json`)

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

export function appWithTranslation<T>(rootLayout: ComponentType<T>) {
  if (i18nInstance === null) {
    initializeI18n()
  }

  // eslint-disable-next-line no-console
  console.log('appWithTranslation', i18nInstance?.isInitialized)
  return rootLayout
}

function initializeI18n() {
  // eslint-disable-next-line no-console
  console.log('here')

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
  if (i18nInstance === null) {
    const instance = initializeI18n()
    return instance.getFixedT(lang, namespace)
  }

  // eslint-disable-next-line no-console
  console.log('getTranslation', i18nInstance?.isInitialized)

  return i18nInstance.getFixedT(lang, namespace)
}
