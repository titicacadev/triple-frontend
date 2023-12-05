import type { Meta, StoryObj } from '@storybook/react'

import { OutlineScrapButton } from '.'

const meta: Meta<typeof OutlineScrapButton> = {
  title: 'ScrapButton / OutlineScrapButton',
  component: OutlineScrapButton,
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
