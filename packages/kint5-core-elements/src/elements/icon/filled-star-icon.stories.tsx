import type { Meta, StoryObj } from '@storybook/react'

import { FilledStarIcon } from './filled-star-icon'

export default {
  title: 'kint5-core-elements / Icons / Filled Star icon',
  component: FilledStarIcon,
} as Meta<typeof FilledStarIcon>

export const Default: StoryObj<typeof FilledStarIcon> = {
  args: {
    color: '#FFBD14',
    width: 24,
    height: 24,
  },
}
