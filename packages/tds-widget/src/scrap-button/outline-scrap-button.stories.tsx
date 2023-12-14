import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { OutlineScrapButton } from '.'

const meta: Meta<typeof OutlineScrapButton> = {
  title: 'ScrapButton / OutlineScrapButton',
  component: OutlineScrapButton,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
}

export default meta

export const Basic: StoryObj<typeof OutlineScrapButton> = {
  args: {
    resource: {
      id: 'scrapable_id',
      type: 'scrapable_type',
      scraped: false,
    },
    size: 34,
  },
}
