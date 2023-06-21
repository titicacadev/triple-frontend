import { PropsWithChildren } from 'react'
import { InitOptions, Namespace, Resource, createInstance } from 'i18next'

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
    if (lang === undefined) {
      return
    }

    i18nInstance = i18nInstance.cloneInstance({
      ...getOptions({ lang }),
    })
    return
  }

  i18nInstance.init({ ...getOptions() })
}

export function getTranslation({
  lang,
  namespace,
}: {
  lang: Language
  namespace: string
}) {
  initializeI18n()
  return i18nInstance.getFixedT(lang, namespace)
}

export function useTranslation(namespace: string) {
  initializeI18n()
  return i18nInstance.getFixedT(null, namespace)
}

function checkIfTokenFileExists(lang: Language) {
  require.resolve(`/public/static/locales/${lang}/local.json`)
}

function constructResources(languages: Language[]) {
  const defaultResources = {
    ko: {
      common: koCommonWeb,
    },
    ja: {
      common: jaCommonWeb,
    },
    zh: {
      common: zhCommonWeb,
    },
  }

  return languages.reduce<Record<string, Resource>>((resources, lang) => {
    try {
      checkIfTokenFileExists(lang)
      const localI18nResource = require(`/public/static/locales/${lang}/local.json`)

      if (lang in resources) {
        resources[lang].local = localI18nResource
      } else {
        resources[lang] = {
          local: localI18nResource,
        }
      }
    } catch (_) {
      // 특정 언어의 토큰 파일이 존재하지 않는 경우, 해당 언어는 건너뜁니다.
    }

    return resources
  }, defaultResources)
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
