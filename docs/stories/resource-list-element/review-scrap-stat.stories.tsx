import { ReviewScrapStat } from '@titicaca/resource-list-element'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'resource-list-element / review-scrap-stat',
  component: ReviewScrapStat,
} as Meta

export const Basic: ComponentStoryObj<typeof ReviewScrapStat> = {
  args: {
    reviewsCount: 2,
    scrapsCount: 0,
    raviewsRating: 3.7,
  },
}
