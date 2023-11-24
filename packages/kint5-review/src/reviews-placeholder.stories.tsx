import type { Meta, StoryObj } from '@storybook/react'

import { ReviewsPlaceholder } from './components/review-placeholder-with-rating'
import { ReviewLanguageProvider } from './components/language-context'

const meta: Meta<typeof ReviewsPlaceholder> = {
  title: 'kint5-review / Review Placeholder',
  component: ReviewsPlaceholder,
  decorators: [
    (Story) => (
      <ReviewLanguageProvider lang="ja">
        <Story />
      </ReviewLanguageProvider>
    ),
  ],
}

export default meta

export const Basic: StoryObj<typeof ReviewsPlaceholder> = {
  args: {
    resourceType: 'tna',
    recentTrip: false,
    hasReviews: false,
    isMorePage: false,
    lang: 'ko',
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
