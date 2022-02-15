import { UserAgentProvider } from '@titicaca/react-contexts'
import LocationProperties from '@titicaca/location-properties'
import { Meta, StoryObj } from '@storybook/react'

import { historyProviderDecorator } from '../../decorators'

export default {
  title: 'Location-Properties / LocationProperties',
  component: LocationProperties,
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
    historyProviderDecorator,
  ],
} as Meta

export const Basic: StoryObj = {
  storyName: '기본 LocationProperties',
  args: {
    addresses: {
      primary: null,
      ko: null,
      en: '1-1 Maihama, Urayasu, Chiba Prefecture 279-0031',
      local: '〒279-0031 東京都千葉県浦安市舞浜11',
    },
    phoneNumber: '+81453305211',
    officialSiteUrl: 'http://www.tokyodisneyresort.jp/tdl/index.html',
    extraProperties: [
      {
        description: '내비게이션용 맵코드',
        value: '349 569 814*88',
      },
    ],
  },
}
