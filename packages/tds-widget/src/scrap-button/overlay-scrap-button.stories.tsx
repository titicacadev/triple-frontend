import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { OverlayScrapButton } from '.'

const meta: Meta<typeof OverlayScrapButton> = {
  title: 'ScrapButton / OverlayScrapButton',
  component: OverlayScrapButton,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
}

export default meta

export const Basic: StoryObj<typeof OverlayScrapButton> = {
  args: {
    resource: {
      id: 'scrapable_id',
      type: 'scrapable_type',
      scraped: false,
    },
    size: 36,
  },
}
