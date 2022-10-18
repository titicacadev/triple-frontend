import { DetailHeader } from '@titicaca/poi-detail'
import { UserAgentProvider } from '@titicaca/react-contexts'
import { ComponentStoryObj, Meta } from '@storybook/react'

import {
  eventTrackingProviderDecorator,
  historyProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

export default {
  title: 'poi-detail / DetailHeader',
  component: DetailHeader,
  decorators: [
    historyProviderDecorator,
    tripleClientMetadataDecorator,
    eventTrackingProviderDecorator,
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

export const Basic: ComponentStoryObj<typeof DetailHeader> = {
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

export const WithBusinessHoursNote: ComponentStoryObj<typeof DetailHeader> = {
  name: '영업시간 추가',
  args: {
    names: {
      primary: '도쿄 디즈니 랜드',
      ko: '도쿄 디즈니 랜드',
      en: 'Tokyo Disney land',
      local: '東京ディズニーランド',
    },
    areas: [
      { id: 1, name: '도쿄' },
      { id: 2, name: '오사카' },
    ],
    scrapsCount: 682,
    reviewsCount: 13859,
    reviewsRating: 4.45,
    todayBusinessHours: '11:00 - 18:00',
    onBusinessHoursClick: undefined,
    permanentlyClosed: false,
  },
}
