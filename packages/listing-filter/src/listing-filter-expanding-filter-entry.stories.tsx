import type { Meta, StoryObj } from '@storybook/react'

import ListingFilter from '.'

export default {
  title: 'listing-filter / ListingFilter.ExpandingFilterEntry',
  component: ListingFilter.ExpandingFilterEntry,
} as Meta

export const Basic: StoryObj<typeof ListingFilter.ExpandingFilterEntry> = {
  name: '기본 Expanding',
  args: {
    active: true,
    disabled: false,
    badge: '0',
    children: '성급 및 필터',
  },
}
