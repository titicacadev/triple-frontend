import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import ReviewsPlaceholder from './components/review-placeholder-with-rating'

export default {
  title: 'Review / Review Placeholder',
  component: ReviewsPlaceholder,
} as ComponentMeta<typeof ReviewsPlaceholder>

export const Basic: ComponentStoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: false,
    hasReviews: false,
    isMorePage: false,
  },
}

export const Article: ComponentStoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'article',
    recentTrip: false,
    hasReviews: false,
    isMorePage: false,
  },
}

export const RecentTrip: ComponentStoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: true,
    hasReviews: false,
    isMorePage: false,
  },
}

export const HasReviews: ComponentStoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: true,
    hasReviews: true,
    isMorePage: false,
  },
}

export const IsMorePage: ComponentStoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: true,
    hasReviews: false,
    isMorePage: true,
  },
}
