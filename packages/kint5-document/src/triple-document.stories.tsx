import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '@titicaca/kint5-core-elements'
import { useScrollToAnchor } from '@titicaca/react-hooks'
import { rest } from 'msw'
import { useEffect } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'
import { koCommonWeb } from '@titicaca/i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '@titicaca/i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '@titicaca/i18n/src/assets/zh-TW/common-web'

import ELEMENTS from './elements'
import MOCK_EMBEDDED from './mocks/triple-document.embedded.json'
import MOCK_ITINERARY from './mocks/triple-document.itinerary.json'
import SAMPLE from './mocks/triple-document.sample.json'
import { DeepLinkProvider } from './prop-context/deep-link'
import { TripleDocument } from './triple-document'
import { TripleElementData } from './types'

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

const {
  table: Table,
  embedded: Embedded,
  anchor: Anchor,
  itinerary: Itinerary,
  coupon: Coupon,
} = ELEMENTS

export default {
  title: 'kint5-document / Kint5Document',
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

export const Sample: StoryObj<typeof TripleDocument> = {
  name: '샘플',
  render: () => (
    <Container centered css={{ maxWidth: 768 }}>
      <TripleDocument>
        {SAMPLE as TripleElementData<string, unknown>[]}
      </TripleDocument>
    </Container>
  ),
}

export const TableExample: StoryObj<typeof Table> = {
  name: '표',
  render: (args) => <Table value={args.value} />,
  args: {
    value: {
      table: {
        type: 'horizontal',
        head: [{ text: '취소 시점' }, { text: '취소 수수료' }],
        body: [
          [{ text: '구매 당일 (No-show 제외)' }, { text: '0원' }],
          [{ text: '구매 익일 ~ 출발 61일 전' }, { text: '1,000원' }],
          [{ text: '출발 60일 전 ~ 출발 31일 전' }, { text: '3,000원' }],
          [{ text: '출발 30일 전 ~ 출발 8일 전' }, { text: '4,000원' }],
          [{ text: '출발 7일 전 ~ 출발 2일 전' }, { text: '6,000원' }],
          [{ text: '출발 1일 전 ~ 출발시간 전' }, { text: '12,000원' }],
          [{ text: '출발시간 이후 (No-show)' }, { text: '15,000원' }],
        ],
      },
    },
  },
}

export const EmbeddedExample: StoryObj<typeof Embedded> = {
  name: '임베딩',
  render: (args) => <Embedded value={args.value} />,
  args: {
    value: MOCK_EMBEDDED,
  },
}

export const AnchorExample: StoryObj<typeof Anchor> = {
  name: '앵커',
  render: function Render() {
    useEffect(() => {
      window.history.pushState(null, '', '#android')
    }, [])

    useScrollToAnchor({ delayTime: 0 })

    return (
      <div>
        <div style={{ height: '200vh' }} />
        <div>Android</div>
        <Anchor value={{ href: 'android' }} />
        <div style={{ height: '200vh' }} />
        <div>ios</div>
        <Anchor value={{ href: 'ios' }} />
      </div>
    )
  },
}

export const DocumentItinerary: StoryObj<typeof Itinerary> = {
  name: '추천코스 기본',
  render: (args) => <Itinerary value={args.value} />,
  args: {
    value: MOCK_ITINERARY.article.source.body[1].value,
  },
}

export const CouponExample: StoryObj<typeof Coupon> = {
  name: '쿠폰',
  render: (args) => (
    <DeepLinkProvider value="https://triple-dev.onelink.me">
      <Coupon value={args.value} />
    </DeepLinkProvider>
  ),
  args: {
    value: {
      identifier: 'TEST_IDENTIFIER',
      description:
        '쿠폰은 최초 1회만 지급되며, 이미 쿠폰을 받았다면  ‘쿠폰함’에서 확인 할 수 있습니다.',
      enabledAt: '2023-07-03',
      color: {
        background: undefined,
        buttonBackground: '#368fff',
        buttonText: '#ffffff',
        description: '#3a3a3a80',
      },
    },
  },
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/benefit/coupons/:id', (req, res, ctx) => {
          return res(
            ctx.json({
              downloaded: true,
            }),
          )
        }),
        rest.get('/api/users/smscert', (req, res, ctx) => {
          return res(
            ctx.json({
              verified: true,
            }),
          )
        }),
      ],
    },
  },
}
