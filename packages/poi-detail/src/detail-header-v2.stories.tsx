import type { Meta, StoryObj } from '@storybook/react'
import { UserAgentProvider } from '@titicaca/react-contexts'

import DetailHeaderV2 from './detail-header-v2'

export default {
  title: 'poi-detail / DetailHeader V2',
  component: DetailHeaderV2,
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
} as Meta<typeof DetailHeaderV2>

export const Basic: StoryObj<typeof DetailHeaderV2> = {
  name: 'V2',
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
    onAreaClick: () => {},
  },
}
