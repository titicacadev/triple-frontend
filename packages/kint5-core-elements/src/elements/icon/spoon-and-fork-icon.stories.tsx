import type { Meta, StoryObj } from '@storybook/react'

import { SpoonAndForkIcon } from './spoon-and-fork-icon'

export default {
  title: 'kint5-core-elements / Icons / Spoon and fork icon',
  component: SpoonAndForkIcon,
} as Meta<typeof SpoonAndForkIcon>

export const Default: StoryObj<typeof SpoonAndForkIcon> = {
  args: {
    width: 36,
    height: 36,
    color: '#B6BBC1',
  },
}
