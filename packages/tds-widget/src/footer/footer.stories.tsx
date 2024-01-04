import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { DefaultFooter } from './default-footer'

export default {
  title: 'footer / Footer',
  component: DefaultFooter,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof DefaultFooter>

export const Basic: StoryObj<typeof DefaultFooter> = {}

export const NoButtons: StoryObj<typeof DefaultFooter> = {
  args: {
    hideAppDownloadButton: true,
  },
}
