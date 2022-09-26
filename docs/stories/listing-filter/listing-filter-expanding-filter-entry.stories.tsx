import ListingFilter from '@titicaca/listing-filter'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'listing-filter / ListingFilter.ExpandingFilterEntry',
  component: ListingFilter.ExpandingFilterEntry,
} as Meta

export const Basic: ComponentStoryObj<
  typeof ListingFilter.ExpandingFilterEntry
> = {
  name: '기본 Expanding',
  args: {
    active: true,
    disabled: false,
    badge: '0',
    children: '성급 및 필터',
  },
}
