import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '@titicaca/core-elements'
import { useScrollToAnchor } from '@titicaca/react-hooks'
import { rest } from 'msw'
import { useEffect } from 'react'
import { appWithTranslation } from '@titicaca/next-i18next'

import { koCommonWeb } from '../../i18n/src/assets/ko/common-web'
import { jaCommonWeb } from '../../i18n/src/assets/ja/common-web'
import { zhTwCommonWeb } from '../../i18n/src/assets/zh-TW/common-web'

import ELEMENTS from './elements'
import MOCK_EMBEDDED from './mocks/triple-document.embedded.json'
import MOCK_ITINERARY from './mocks/triple-document.itinerary.json'
import MOCK_REGIONS from './mocks/triple-document.regions.json'
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
  text: Text,
  note: Note,
  video: Video,
  table: Table,
  regions: Regions,
  embedded: Embedded,
  anchor: Anchor,
  itinerary: Itinerary,
  coupon: Coupon,
} = ELEMENTS

export default {
  title: 'triple-document / TripleDocument',
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

export const TextExample: StoryObj<typeof Text> = {
  name: '텍스트',
  render: () => (
    <>
      <Text value={{ text: '텍스트: medium 16 80%' }} />
      <Text
        value={{
          rawHTML: '텍스트 <a href="/regions/:regionId">Inline link</a>',
        }}
      />
      <Text bold value={{ text: '강조 텍스트: bold 16 100%' }} alpha={1} />
    </>
  ),
}

export const NoteExample: StoryObj<typeof Note> = {
  name: '노트',
  render: (args) => <Note value={args.value} />,
  args: {
    value: {
      body: '목적지로 바로 가지 않고, 중간 지점에서 잠시 머무는 단기 체류를 뜻한다. 보통 경유 시간인 3-4시간 정도가 아니라 24시간 이상을 뜻하기 때문에 관광과 숙박이 가능한 것이 특징. 일부 항공사는 스탑오버시 무료 관광을 제공하니 참고할것!',
      title: '잠깐! 스탑오버(Stopover)란?',
    },
  },
}

export const VideoExample: StoryObj<typeof Video> = {
  name: '비디오',
  render: (args) => <Video value={args.value} />,
  args: {
    value: {
      provider: 'youtube',
      identifier: 'hYIe4VrfHoA',
    },
  },
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

export const RegionExample: StoryObj<typeof Regions> = {
  name: '리전',
  render: (args) => <Regions value={args.value} />,
  args: {
    value: { regions: MOCK_REGIONS },
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
