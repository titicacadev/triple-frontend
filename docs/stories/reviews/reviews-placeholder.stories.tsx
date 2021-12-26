import ReviewsPlaceholder from '@titicaca/review/lib/review-placeholder-with-rating'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Reviews / Review Placeholder',
  component: ReviewsPlaceholder,
} as Meta

export const Basic: StoryObj = {
  storyName: '플레이스홀더',
  args: {
    resourceType: 'tna',
  },
}
