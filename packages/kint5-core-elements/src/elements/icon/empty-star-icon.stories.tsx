import type { Meta, StoryObj } from '@storybook/react'

import { EmptyStarIcon } from './empty-star-icon'

export default {
  title: 'kint5-core-elements / Icons / Empty Star icon',
  component: EmptyStarIcon,
} as Meta<typeof EmptyStarIcon>

export const Default: StoryObj<typeof EmptyStarIcon> = {
  args: {
    color: '#FCC038',
    width: 24,
    height: 24,
  },
}
