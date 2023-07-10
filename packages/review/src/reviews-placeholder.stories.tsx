import type { Meta, StoryObj } from '@storybook/react'

import { ReviewsPlaceholder } from './components/review-placeholder-with-rating'

export default {
  title: 'Review / Review Placeholder',
  component: ReviewsPlaceholder,
} as Meta<typeof ReviewsPlaceholder>

export const Basic: StoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: false,
    hasReviews: false,
    isMorePage: false,
  },
}

export const Article: StoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'article',
    recentTrip: false,
    hasReviews: false,
    isMorePage: false,
  },
}

export const RecentTrip: StoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: true,
    hasReviews: false,
    isMorePage: false,
  },
}

export const HasReviews: StoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: true,
    hasReviews: true,
    isMorePage: false,
  },
}

export const IsMorePage: StoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: true,
    hasReviews: false,
    isMorePage: true,
  },
}
