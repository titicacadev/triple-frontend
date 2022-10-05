import { ComponentStoryObj, Meta } from '@storybook/react'

import ListingFilter from '.'

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

export const Basic: ComponentStoryObj<typeof ListingFilter.PrimaryFilterEntry> =
  {
    name: '기본 Primary',
    args: {
      disabled: false,
      children: '5.17-5.20, 3명',
    },
  }
