import { OutlineScrapButton } from '@titicaca/scrap-button'
import { ScrapsProvider } from '@titicaca/react-contexts'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'ScrapButton / OutlineScrapButton',
  component: OutlineScrapButton,
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
    size: 34,
  },
}
