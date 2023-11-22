import type { Meta, StoryObj } from '@storybook/react'

import { FilledThumbsUpIcon } from './filled-thumbs-up-icon'

export default {
  title: 'kint5-core-elements / Icons / Filled Thumbs up icon',
  component: FilledThumbsUpIcon,
} as Meta<typeof FilledThumbsUpIcon>

export const Default: StoryObj<typeof FilledThumbsUpIcon> = {
  args: {
    color: '#1C1B1F',
    width: 24,
    height: 24,
  },
}
