import type { Meta, StoryObj } from '@storybook/react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from '../../../i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '../../../i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '../../../i18n/src/assets/zh-TW/common-web'

import HOTELS from './mocks/hotels.sample.json'
import POIS from './mocks/pois.sample.json'
import { PoiListElement } from './poi-list-element'

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
  title: 'poi-list-elements / PoiList',
  component: PoiListElement,
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
} as Meta<typeof PoiListElement>

const [POI] = POIS
const [HOTEL] = HOTELS

export const PoiList: StoryObj<typeof PoiListElement> = {
  name: 'POI 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
  },
}

export const HotelList: StoryObj<typeof PoiListElement> = {
  name: '호텔 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: HOTEL as any,
  },
}

export const TripleDocumentList: StoryObj<typeof PoiListElement> = {
  name: 'TripleDocument 리스트',
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    poi: POI as any,
    compact: true,
  },
}
