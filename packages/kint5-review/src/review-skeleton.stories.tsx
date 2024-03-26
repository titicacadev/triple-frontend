import type { Meta, StoryObj } from '@storybook/react'

import { ReviewSkeleton } from './components/review-skeleton'

export default {
  title: 'kint5-review / Review Skeleton',
  component: ReviewSkeleton,
} as Meta<typeof ReviewSkeleton>

export const Default: StoryObj<typeof ReviewSkeleton> = {
  render: () => <ReviewSkeleton />,
  args: {},
}
