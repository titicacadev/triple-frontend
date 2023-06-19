import { ComponentType } from 'react'
import { createInstance, InitOptions, Namespace } from 'i18next'

import { koCommonWeb } from './assets/ko/common-web'
import { jaCommonWeb } from './assets/ja/common-web'
import { zhCommonWeb } from './assets/zh/common-web'

const i18nInstance = createInstance()

interface I18nConfigParams {
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
      common: koCommonWeb,
      local: {},
    },
    en: {
      local: {},
    },
    ja: {
      common: jaCommonWeb,
      local: {},
    },
    zh: {
      common: zhCommonWeb,
      local: {},
    },
  }

  return languages.reduce((acc, lang) => {
    acc[lang].local = require(`/public/static/locales/${lang}/local.json`)

    return acc
  }, initialResources)
}

function getOptions({
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
  initializeI18n()
  return rootLayout
}

function initializeI18n() {
  if (i18nInstance.isInitialized) {
    return
  }

  i18nInstance.init({ ...getOptions() })
}

export function getTranslation({
  lang,
  namespace,
}: {
  lang: string
  namespace: string
}) {
  initializeI18n()
  return i18nInstance.getFixedT(lang, namespace)
}
