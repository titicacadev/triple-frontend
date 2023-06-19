import { PropsWithChildren } from 'react'
import i18next, { InitOptions, Namespace } from 'i18next'

import { koCommonWeb } from '../assets/ko/common-web'
import { jaCommonWeb } from '../assets/ja/common-web'
import { zhCommonWeb } from '../assets/zh/common-web'

import { DEFAULT_NAMESPACE, FALLBACK_LANGUAGE, LANGUAGES } from './constants'
import { Language } from './types'

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

function initializeI18n({ lang }: { lang?: Language } = {}) {
  if (i18next.isInitialized) {
    const language = lang ?? i18next.resolvedLanguage

    i18next.changeLanguage(language)
    return
  }

  i18next.init({ ...getOptions() })
}

export function useTranslation(namespace: string) {
  initializeI18n()
  return i18next.getFixedT(null, namespace)
}
