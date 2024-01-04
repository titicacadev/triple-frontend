import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { PoiDetailHeader } from './detail-header'

export default {
  title: 'poi-detail / DetailHeader',
  component: PoiDetailHeader,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof PoiDetailHeader> = {
  name: '기본',
  args: {
    names: {
      primary: '도쿄 디즈니 랜드',
      ko: '도쿄 디즈니 랜드',
      en: 'Tokyo Disney land',
      local: '東京ディズニーランド',
    },
    areaName: '도쿄',
    scrapsCount: 682,
    reviewsCount: 13859,
    reviewsRating: 4.45,
  },
}

export const WithBusinessHoursNote: StoryObj<typeof PoiDetailHeader> = {
  name: '영업시간 추가',
  args: {
    ...Basic.args,
    todayBusinessHours: '11:00 - 18:00',
    permanentlyClosed: false,
  },
}
