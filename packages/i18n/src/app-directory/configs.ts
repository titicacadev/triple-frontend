import { InitOptions, Namespace, Resource } from 'i18next'

import { koCommonWeb } from '../assets/ko/common-web'
import { jaCommonWeb } from '../assets/ja/common-web'
import { zhCommonWeb } from '../assets/zh/common-web'

import { Language } from './types'
import { DEFAULT_NAMESPACE, FALLBACK_LANGUAGE, LANGUAGES } from './constants'

interface I18nConfigParams {
  lang: string
  namespace: Namespace
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

function checkIfTokenFileExists(lang: Language) {
  require.resolve(`/public/static/locales/${lang}/local.json`)
}
