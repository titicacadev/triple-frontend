import { useEffect, useState, useMemo } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'
import i18next from 'i18next'

import { koCommonWeb } from '../packages/i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '../packages/i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '../packages/i18n/src/assets/zh-TW/common-web'

const locales = ['ko', 'ja', 'zh-TW']
const resources = {
  ko: {
    'common-web': koCommonWeb,
  },
  ja: {
    'common-web': jaCommonWeb,
  },
  'zh-TW': {
    'common-web': zhTwCommonWeb,
  },
}

// globalI18n을 미리 초기화
let globalI18nInstance = null

function initializeGlobalI18n() {
  if (!globalI18nInstance) {
    globalI18nInstance = i18next.createInstance()
    globalI18nInstance.init({
      lng: 'ko',
      fallbackLng: 'ko',
      ns: ['common-web'],
      defaultNS: 'common-web',
      resources,
      react: {
        useSuspense: false,
      },
    })

    // @titicaca/next-i18next의 globalI18n에 할당
    // CommonJS 모듈이므로 직접 접근
    try {
      const appWithTranslationModule = require('@titicaca/next-i18next/dist/commonjs/appWithTranslation')
      appWithTranslationModule.globalI18n = globalI18nInstance
      console.log(
        '[Storybook] globalI18n initialized:',
        !!appWithTranslationModule.globalI18n,
      )
    } catch (error) {
      console.error('[Storybook] Failed to initialize globalI18n:', error)
    }
  }
  return globalI18nInstance
}

// Storybook 로드 시 즉시 초기화
initializeGlobalI18n()

export function I18nDecorator(Story, context) {
  const [locale, setLocale] = useState('ko')

  const _nextI18Next = {
    ns: 'common-web',
    initialLocale: locale,
    initialI18nStore: resources,
    userConfig: {
      resources,
      i18n: {
        locales,
        defaultLocale: locale,
      },
    },
  }

  useEffect(() => {
    const newLocale = context.globals.locale
    setLocale(newLocale)

    // globalI18n의 언어도 변경
    if (globalI18nInstance) {
      globalI18nInstance.changeLanguage(newLocale)
    }
  }, [context.globals.locale])

  const AppWithTranslation = appWithTranslation(Story)

  return (
    <AppWithTranslation
      pageProps={{
        _nextI18Next,
      }}
    />
  )
}
