import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { mockDateDecorator } from 'storybook-mock-date-decorator'
import { I18nDecorator } from './i18n'
import {
  globalStyleDecorator,
  tripleClientMetadataDecorator,
  userAgentProviderDecorator,
  historyProviderDecorator,
  sessionContextProviderDecorator,
  envProviderDecorator,
} from './decorators'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: '/mockServiceWorker.js' },
})

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    mockDateDecorator,
    globalStyleDecorator,
    tripleClientMetadataDecorator,
    userAgentProviderDecorator,
    historyProviderDecorator,
    sessionContextProviderDecorator,
    envProviderDecorator,
    I18nDecorator,
  ],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'i18n locale',
      defaultValue: 'ko',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', right: '🇰🇷', title: '한국어' },
          { value: 'ja', right: '🇯🇵', title: '일본어' },
          { value: 'zh-TW', right: '🇨🇳', title: '중국어(번체)' },
        ],
      },
    },
  },
}

export default preview
