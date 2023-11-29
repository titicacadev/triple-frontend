import type { Meta, StoryObj } from '@storybook/react'
import { TripleWeb } from '@titicaca/triple-web'

import DetailHeaderV2 from './detail-header-v2'

export default {
  title: 'poi-detail / DetailHeader V2',
  component: DetailHeaderV2,
  decorators: [
    (Story) => (
      <TripleWeb
        userAgentProvider={{
          ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
          browser: { name: 'WebKit', version: '605.1.15', major: '605' },
          engine: { name: 'WebKit', version: '605.1.15' },
          os: { name: 'iOS', version: '13.3.1' },
          device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
          cpu: { architecture: undefined },
        }}
      >
        <Story />
      </TripleWeb>
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
  },
}
