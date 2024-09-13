import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { mockDateDecorator } from 'storybook-mock-date-decorator'
import { themeDecorator, tripleWebProviderDecorator } from './decorators'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: '/mockServiceWorker.js' },
})

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [mockDateDecorator, themeDecorator, tripleWebProviderDecorator],

  tags: ['autodocs'],

  globalTypes: {
    locale: {
      name: 'Locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', right: '🇰🇷', title: '한국어' },
          { value: 'ja', right: '🇯🇵', title: '일본어' },
          { value: 'zh-TW', right: '🇨🇳', title: '중국어(번체)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'ko',
  },
}

export default preview
