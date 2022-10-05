import { ScrapsProvider } from '@titicaca/react-contexts'
import { Meta, StoryObj } from '@storybook/react'

import { OverlayScrapButton } from './scrap-button'

export default {
  title: 'ScrapButton / OverlayScrapButton',
  component: OverlayScrapButton,
  decorators: [
    (Story) => (
      <ScrapsProvider>
        <Story />
      </ScrapsProvider>
    ),
  ],
} as Meta

export const Basic: StoryObj = {
  args: {
    resource: {
      id: 'scrapable_id',
      type: 'scrapable_type',
      scraped: false,
    },
    size: 36,
  },
}
