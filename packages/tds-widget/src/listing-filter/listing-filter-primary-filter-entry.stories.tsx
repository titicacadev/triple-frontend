import type { Meta, StoryObj } from '@storybook/react'

import { ListingFilter } from './listing-filter'

export default {
  title: 'listing-filter / ListingFilter.PrimaryFilterEntry',
  component: ListingFilter.PrimaryFilterEntry,
  decorators: [
    (Story) => (
      <ListingFilter>
        <Story />
      </ListingFilter>
    ),
  ],
} as Meta

export const Basic: StoryObj<typeof ListingFilter.PrimaryFilterEntry> = {
  name: '기본 Primary',
  args: {
    disabled: false,
    children: '5.17-5.20, 3명',
  },
}
