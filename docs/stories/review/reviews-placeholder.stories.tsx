import { ReviewsPlaceholder } from '@titicaca/review'
import { Meta, StoryObj } from '@storybook/react'

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
