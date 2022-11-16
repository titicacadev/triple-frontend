import { Suspense } from 'react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { withI18next } from 'storybook-addon-i18next'
import { GlobalStyle } from '@titicaca/core-elements'
import { RouterContext } from 'next/dist/shared/lib/router-context' // next 12
import koI18nAsset from '../../i18n-assets/ko/common-web.json'
import jaI18nAsset from '../../i18n-assets/ja/common-web.json'
import zhI18nAsset from '../../i18n-assets/zh-TW/common-web.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'ko',
  ns: 'common-web',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ko: {
      'common-web': koI18nAsset,
    },
    ja: {
      'common-web': jaI18nAsset,
    },
    'zh-TW': {
      'common-web': zhI18nAsset,
    },
  },
})

export const decorators = [
  withI18next({ i18n }),

  (Story) => (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <GlobalStyle />
        <Story />
      </I18nextProvider>
    </Suspense>
  ),
]

export const parameters = {
  actions: {
    argTypesRegex: '^on.*',
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
