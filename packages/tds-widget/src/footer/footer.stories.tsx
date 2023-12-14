import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import Footer from './default-footer'

export default {
  title: 'footer / Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof Footer>

export const Basic: StoryObj<typeof Footer> = {}

export const NoButtons: StoryObj<typeof Footer> = {
  args: {
    hideAppDownloadButton: true,
  },
}
