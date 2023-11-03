import type { Meta, StoryObj } from '@storybook/react'

import { FilledHeartIcon } from './filled-heart-icon'

export default {
  title: 'kint5-core-elements / Icons / Filled heart icon',
  component: FilledHeartIcon,
} as Meta<typeof FilledHeartIcon>

export const Default: StoryObj<typeof FilledHeartIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#EB147B',
  },
}
