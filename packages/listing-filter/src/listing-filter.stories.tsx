import { ComponentStory, Meta } from '@storybook/react'

import ListingFilter from '.'

export default {
  title: 'listing-filter / ListingFilter',
  component: ListingFilter,
} as Meta

export const Basic: ComponentStory<typeof ListingFilter> = (args) => {
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
}
Basic.storyName = '전체 필터 타입'
