import type { Meta, StoryObj } from '@storybook/react'

import { EmptyHeartIcon } from './empty-heart-icon'

export default {
  title: 'kint5-core-elements / Icons / Empty heart icon',
  component: EmptyHeartIcon,
} as Meta<typeof EmptyHeartIcon>

export const Default: StoryObj<typeof EmptyHeartIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
