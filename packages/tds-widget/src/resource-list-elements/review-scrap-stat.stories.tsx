import type { Meta, StoryObj } from '@storybook/react'

import { ReviewScrapStat } from './review-scrap-stat'

const meta: Meta<typeof ReviewScrapStat> = {
  title: 'resource-list-element / review-scrap-stat',
  component: ReviewScrapStat,
}

export default meta

export const Review: StoryObj<typeof ReviewScrapStat> = {
  args: {
    reviewsCount: 23,
    reviewsRating: 3.7,
  },
}

export const Scrap: StoryObj<typeof ReviewScrapStat> = {
  args: {
    scrapsCount: 1027,
  },
}

export const Full: StoryObj<typeof ReviewScrapStat> = {
  args: {
    reviewsCount: 23,
    scrapsCount: 7,
    reviewsRating: 3.7,
  },
}
