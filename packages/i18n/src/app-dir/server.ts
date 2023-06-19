import { PropsWithChildren } from 'react'
import { InitOptions, Namespace, createInstance } from 'i18next'

import { koCommonWeb } from '../assets/ko/common-web'
import { jaCommonWeb } from '../assets/ja/common-web'
import { zhCommonWeb } from '../assets/zh/common-web'

import { DEFAULT_NAMESPACE, FALLBACK_LANGUAGE, LANGUAGES } from './constants'
import { Language } from './types'

export let i18nInstance = createInstance()

interface I18nConfigParams {
  lang: string
  namespace: Namespace
}

type Layout<T> = (props: PropsWithChildren<T>) => JSX.Element

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

export function appWithTranslation<T extends { params: { lang: Language } }>(
  rootLayout: Layout<T>,
) {
  return (props: Parameters<Layout<T>>[0]) => {
    const {
      params: { lang },
    } = props
    initializeI18n({ lang })

    return rootLayout(props)
  }
}

export function initializeI18n({ lang }: { lang?: Language } = {}) {
  if (i18nInstance.isInitialized) {
    const language = lang ?? i18nInstance.resolvedLanguage

    i18nInstance = i18nInstance.cloneInstance({
      ...getOptions({ lang: language }),
    })
    return
  }

  i18nInstance.init({ ...getOptions() })
}

export function useTranslation(namespace: string) {
  initializeI18n()
  return i18nInstance.getFixedT(null, namespace)
}
