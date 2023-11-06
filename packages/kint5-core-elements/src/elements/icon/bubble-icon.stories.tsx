import type { Meta, StoryObj } from '@storybook/react'

import { BubbleIcon } from './bubble-icon'

export default {
  title: 'kint5-core-elements / Icons / Bubble icon',
  component: BubbleIcon,
} as Meta<typeof BubbleIcon>

export const Default: StoryObj<typeof BubbleIcon> = {
  args: {
    width: 22,
    height: 21,
    color: '#000',
  },
}
