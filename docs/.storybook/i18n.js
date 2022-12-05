import { useEffect, useState } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'

import koI18nAsset from '../../i18n-assets/ko/common-web.json'
import jaI18nAsset from '../../i18n-assets/ja/common-web.json'
import zhI18nAsset from '../../i18n-assets/zh-TW/common-web.json'

const locales = ['ko', 'ja', 'zh']
const resources = {
  ko: {
    'common-web': koI18nAsset,
  },
  ja: {
    'common-web': jaI18nAsset,
  },
  zh: {
    'common-web': zhI18nAsset,
  },
}

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
    setLocale(context.globals.locale)
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
