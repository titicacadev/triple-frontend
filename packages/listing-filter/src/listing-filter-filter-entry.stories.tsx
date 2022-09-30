import ListingFilter from '@titicaca/listing-filter'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'listing-filter / ListingFilter.FilterEntry',
  component: ListingFilter.FilterEntry,
  decorators: [
    (Story) => (
      <ListingFilter>
        <Story />
      </ListingFilter>
    ),
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof ListingFilter.FilterEntry> = {
  name: '기본 FilterEntry',
  args: {
    active: true,
    disabled: false,
    children: '부티크 호텔',
  },
}

export const Underline: ComponentStoryObj<typeof ListingFilter.FilterEntry> = {
  name: 'Underline FilterEntry',
  args: {
    underline: true,
    active: true,
    activeIconImage: '/ico-category-food-on.svg',
    inactiveIconImage: '/ico-category-food.svg',
    disabled: false,
    children: '음식점',
  },
}

export const WithIconImage: ComponentStoryObj<
  typeof ListingFilter.FilterEntry
> = {
  name: 'FilterEntry (with Icon Image)',
  args: {
    active: true,
    activeIconImage: '/ico-category-food-on.svg',
    inactiveIconImage: '/ico-category-food.svg',
    disabled: false,
    children: '음식점',
  },
}
