import type { Meta, StoryObj } from '@storybook/react'
import { UserAgentProvider } from '@titicaca/react-contexts'

import DetailHeader from './detail-header'

export default {
  title: 'poi-detail / DetailHeader',
  component: DetailHeader,
  decorators: [
    (Story) => (
      <UserAgentProvider
        value={{
          isPublic: true,
          isMobile: true,
          os: {},
          app: null,
        }}
      >
        <Story />
      </UserAgentProvider>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof DetailHeader> = {
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
    onBusinessHoursClick: () => {},
  },
}

export const WithBusinessHoursNote: StoryObj<typeof DetailHeader> = {
  name: '영업시간 추가',
  args: {
    ...Basic.args,
    todayBusinessHours: '11:00 - 18:00',
    permanentlyClosed: false,
    onBusinessHoursClick: () => {},
  },
}
