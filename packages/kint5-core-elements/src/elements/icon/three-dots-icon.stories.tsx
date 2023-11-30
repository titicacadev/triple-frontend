import type { Meta, StoryObj } from '@storybook/react'

import { ThreeDotsIcon } from './three-dots-icon'

export default {
  title: 'kint5-core-elements / Icons / Three Dots Icon',
  component: ThreeDotsIcon,
} as Meta<typeof ThreeDotsIcon>

export const Default: StoryObj<typeof ThreeDotsIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#9199A1',
  },
}
