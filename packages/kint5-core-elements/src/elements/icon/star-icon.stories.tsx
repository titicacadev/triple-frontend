import type { Meta, StoryObj } from '@storybook/react'

import { StarIcon } from './star-icon'

export default {
  title: 'kint5-core-elements / Icons / Star icon',
  component: StarIcon,
} as Meta<typeof StarIcon>

export const Default: StoryObj<typeof StarIcon> = {
  args: {
    color: '#FFBD14',
    width: 24,
    height: 24,
  },
}
