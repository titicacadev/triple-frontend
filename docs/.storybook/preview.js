import { GlobalStyle } from '@titicaca/core-elements'
import { RouterContext } from 'next/dist/shared/lib/router-context' // next 12

import { I18nDecorator } from './i18n'

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
  I18nDecorator,
]

export const parameters = {
  actions: {
    argTypesRegex: '^on.*',
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'i18n locale',
    defaultValue: 'ko',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ko', right: '🇰🇷', title: '한국어' },
        { value: 'ja', right: '🇯🇵', title: '일본어' },
        { value: 'zh', right: '🇨🇳', title: '중국어(번체)' },
      ],
    },
  },
}
