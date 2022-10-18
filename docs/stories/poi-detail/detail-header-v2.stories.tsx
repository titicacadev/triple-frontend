import { DetailHeaderV2 } from '@titicaca/poi-detail'
import { UserAgentProvider } from '@titicaca/react-contexts'
import { ComponentStoryObj, Meta } from '@storybook/react'

import {
  eventTrackingProviderDecorator,
  historyProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

export default {
  title: 'poi-detail / DetailHeader V2',
  component: DetailHeaderV2,
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

export const Basic: ComponentStoryObj<typeof DetailHeaderV2> = {
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
  },
}
