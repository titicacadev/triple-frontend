import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { DirectionButtons } from './direction-buttons'

export default {
  title: 'directions-finder / DirectionButtons',
  component: DirectionButtons,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof DirectionButtons>

export const Basic: StoryObj<typeof DirectionButtons> = {
  args: {
    primaryName: '도쿄 디즈니 랜드',
    localName: '東京ディズニーランド',
    localAddress: '〒279-0031 東京都千葉県浦安市舞浜11',
    phoneNumber: '+81453305211',
  },
}
