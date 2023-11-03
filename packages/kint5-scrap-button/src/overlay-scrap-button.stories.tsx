import type { Meta, StoryObj } from '@storybook/react'
import { ScrapsProvider } from '@titicaca/react-contexts'

import { OverlayScrapButton } from './scrap-button'

export default {
  title: 'kint5-scrap-button / OverlayScrapButton',
  component: OverlayScrapButton,
  decorators: [
    (Story) => (
      <ScrapsProvider>
        <Story />
      </ScrapsProvider>
    ),
  ],
} as Meta

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
