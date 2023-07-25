import type { Meta, StoryObj } from '@storybook/react'

import ListingFilter from './listing-filter'

export default {
  title: 'listing-filter / ListingFilter',
  component: ListingFilter,
  subcomponents: {
    FilterEntry: ListingFilter.FilterEntry,
    ExpandingFilterEntry: ListingFilter.ExpandingFilterEntry,
    PrimaryFilterEntry: ListingFilter.PrimaryFilterEntry,
  },
} as Meta<typeof ListingFilter>

export const Basic: StoryObj<typeof ListingFilter> = {
  render: (args) => {
    return (
      <ListingFilter {...args}>
        <ListingFilter.PrimaryFilterEntry>
          5.17-5.20, 3명
        </ListingFilter.PrimaryFilterEntry>
        <ListingFilter.ExpandingFilterEntry>
          침대타입
        </ListingFilter.ExpandingFilterEntry>
        <ListingFilter.FilterEntry>무료취소</ListingFilter.FilterEntry>
        <ListingFilter.FilterEntry
          active={false}
          activeIconImage="/ico-category-food-on.svg"
          inactiveIconImage="/ico-category-food.svg"
        >
          음식점
        </ListingFilter.FilterEntry>
      </ListingFilter>
    )
  },
}
