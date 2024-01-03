import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { mockDateDecorator } from 'storybook-mock-date-decorator'
import { themeDecorator, tripleWebProviderDecorator } from './decorators'
import i18n from './i18next'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: '/mockServiceWorker.js' },
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    i18n,
  },
  loaders: [mswLoader],
  decorators: [mockDateDecorator, themeDecorator, tripleWebProviderDecorator],
  globals: {
    locale: 'ko',
    locales: {
      ko: { title: '한국어', right: '🇰🇷' },
      ja: { title: '일본어', right: '🇯🇵' },
      'zh-TW': { title: '중국어(번체)', right: '🇨🇳' },
    },
  },
}

export default preview
