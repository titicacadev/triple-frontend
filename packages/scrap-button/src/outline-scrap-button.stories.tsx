import { ScrapsProvider } from '@titicaca/react-contexts'
import { ComponentStoryObj, Meta } from '@storybook/react'

import { OutlineScrapButton } from './scrap-button'

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

export const Basic: ComponentStoryObj<typeof OutlineScrapButton> = {
  args: {
    resource: {
      id: 'scrapable_id',
      type: 'scrapable_type',
      scraped: false,
    },
    size: 34,
  },
}
