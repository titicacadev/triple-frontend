import { useEffect, useState } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from './public/assets/ko/common-web'
import { jaCommonWeb } from './public/assets/ja/common-web'
import { zhTwCommonWeb } from './public/assets/zh-TW/common-web'

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
