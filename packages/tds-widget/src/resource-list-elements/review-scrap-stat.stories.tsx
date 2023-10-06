import type { Meta, StoryObj } from '@storybook/react'

import ReviewScrapStat from './review-scrap-stat'

export default {
  title: 'resource-list-element / review-scrap-stat',
  component: ReviewScrapStat,
} as Meta<typeof ReviewScrapStat>

export const Basic: StoryObj<typeof ReviewScrapStat> = {
  args: {
    reviewsCount: 23,
    scrapsCount: 7,
    reviewsRating: 3.7,
  },
}
