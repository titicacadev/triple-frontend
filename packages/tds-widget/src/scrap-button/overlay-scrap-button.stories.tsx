import type { Meta, StoryObj } from '@storybook/react'

import { OverlayScrapButton } from '.'

const meta: Meta<typeof OverlayScrapButton> = {
  title: 'ScrapButton / OverlayScrapButton',
  component: OverlayScrapButton,
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
