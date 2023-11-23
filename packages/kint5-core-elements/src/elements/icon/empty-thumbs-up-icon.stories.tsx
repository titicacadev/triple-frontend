import type { Meta, StoryObj } from '@storybook/react'

import { EmptyThumbsUpIcon } from './empty-thumbs-up-icon'

export default {
  title: 'kint5-core-elements / Icons / Empty Thumbs up icon',
  component: EmptyThumbsUpIcon,
} as Meta<typeof EmptyThumbsUpIcon>

export const Default: StoryObj<typeof EmptyThumbsUpIcon> = {
  args: {
    color: '#1C1B1F',
    width: 24,
    height: 24,
  },
}
