import type { Meta, StoryObj } from '@storybook/react'

import { ThumbsUpIcon } from './thumbs-up-icon'

export default {
  title: 'kint5-core-elements / Icons / Thumbs up icon',
  component: ThumbsUpIcon,
} as Meta<typeof ThumbsUpIcon>

export const Default: StoryObj<typeof ThumbsUpIcon> = {
  args: {
    color: '#1C1B1F',
    width: 24,
    height: 24,
  },
}
