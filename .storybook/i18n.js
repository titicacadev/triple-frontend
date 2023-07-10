import { useEffect, useState } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from '@titicaca/i18n/assets'
import { jaCommonWeb } from '@titicaca/i18n/assets'
import { zhTwCommonWeb } from '@titicaca/i18n/assets'

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
