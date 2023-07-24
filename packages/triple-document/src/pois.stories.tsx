import type { Meta } from '@storybook/react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from '../../i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '../../i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '../../i18n/src/assets/zh-TW/common-web'

import POIS from './mocks/pois.sample.json'
import HOTEL from './mocks/hotel.sample.json'
import ELEMENTS from './elements'

const { pois: Pois } = ELEMENTS

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
  title: 'triple-document / POI',
  component: Pois,
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
} as Meta

export function Normal() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS,
        display: 'default',
      }}
    />
  )
}
Normal.storyName = '일반'

export function NormalWithImagePlaceholder() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        // image를 제외해서 placeholder 확인
        pois: POIS.map(({ source: { image, ...source }, ...rest }) => ({
          source,
          ...rest,
        })),
        display: 'default',
      }}
    />
  )
}
NormalWithImagePlaceholder.storyName = '일반 w/ 이미지 Placeholder'

export function List() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS,
        display: 'list',
      }}
    />
  )
}
List.storyName = '리스트'

export function ListWithImagePlaceholder() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        // image를 제외해서 placeholder 확인
        pois: POIS.map(({ source: { image, ...source }, ...rest }) => ({
          source,
          ...rest,
        })),
        display: 'list',
      }}
    />
  )
}
ListWithImagePlaceholder.storyName = '리스트 w/ 이미지 Placeholder'

export function HotelListWithPrice() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: [HOTEL],
        display: 'list',
      }}
    />
  )
}
HotelListWithPrice.storyName = '리스트 (호텔 w/ 가격)'
