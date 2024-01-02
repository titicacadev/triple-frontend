import type { Meta, StoryObj } from '@storybook/react'
import { appWithTranslation } from '@titicaca/next-i18next'
import { koCommonWeb } from '@titicaca/i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '@titicaca/i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '@titicaca/i18n/src/assets/zh-TW/common-web'

import { TripleGlobalPublicHeader } from './triple-global-public-header'

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

export default {
  title: 'kint5-public-header / TripleGlobalPublicHeader',
  component: TripleGlobalPublicHeader,
  argTypes: {
    category: {
      control: { type: 'select' },
      options: ['air', 'hotels', 'tna'],
    },
  },
  decorators: [
    (Story, context) => {
      const App = appWithTranslation(Story, {
        i18n: { locales, defaultLocale: locales[0] },
        lng: context.globals.locale,
        fallbackLng: 'ko',
        resources,
        defaultNS: 'common-web',
        serializeConfig: false,
      })

      return <App pageProps={{}} />
    },
  ],
} as Meta<typeof TripleGlobalPublicHeader>

export const Basic: StoryObj<typeof TripleGlobalPublicHeader> = {
  args: {
    disableAutoHide: true,
  },
}

export const DeeplinkPath: StoryObj<typeof TripleGlobalPublicHeader> = {
  args: {
    ...Basic.args,
    deeplinkPath: 'https://triple.guide',
  },
}
