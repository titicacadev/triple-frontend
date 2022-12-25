import { useEffect, useState } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from '@titicaca/i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '@titicaca/i18n/src/assets/ja/common-web'
import { zhCommonWeb } from '@titicaca/i18n/src/assets/zh/common-web'

const locales = ['ko', 'ja', 'zh']
const resources = {
  ko: {
    'common-web': koCommonWeb,
  },
  ja: {
    'common-web': jaCommonWeb,
  },
  zh: {
    'common-web': zhCommonWeb,
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
