import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from '../../../i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '../../../i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '../../../i18n/src/assets/zh-TW/common-web'

import { PublicHeader } from './public-header'

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
  title: 'public-header / PublicHeader',
  component: PublicHeader,
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
} as Meta<typeof PublicHeader>

export const Basic: StoryObj<typeof PublicHeader> = {
  args: {
    disableAutoHide: true,
  },
}

export const DeeplinkPath: StoryObj<typeof PublicHeader> = {
  args: {
    ...Basic.args,
    deeplinkPath: 'https://triple.guide',
  },
}

export const Categories: StoryFn<typeof PublicHeader> = () => {
  return (
    <>
      <PublicHeader disableAutoHide category="air" />
      <PublicHeader disableAutoHide category="hotels" />
      <PublicHeader disableAutoHide category="tna" />
    </>
  )
}
