import { Meta, StoryObj } from '@storybook/react'

import ReviewsPlaceholder from './components/review-placeholder-with-rating'

export default {
  title: 'Review / Review Placeholder',
  component: ReviewsPlaceholder,
} as Meta

export const Basic: StoryObj = {
  name: '플레이스홀더',
  args: {
    resourceType: 'tna',
  },
}
