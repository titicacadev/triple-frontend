import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { AwardFooter } from './award-footer'

export default {
  title: 'footer / AwardFooter',
  component: AwardFooter,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof AwardFooter>

export const Basic: StoryObj<typeof AwardFooter> = {}
