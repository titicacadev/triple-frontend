import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import ReviewScrapStat from './review-scrap-stat'

export default {
  title: 'resource-list-element / review-scrap-stat',
  component: ReviewScrapStat,
} as ComponentMeta<typeof ReviewScrapStat>

export const Basic: ComponentStoryObj<typeof ReviewScrapStat> = {
  args: {
    reviewsCount: 2,
    scrapsCount: 0,
    reviewsRating: 3.7,
  },
}
