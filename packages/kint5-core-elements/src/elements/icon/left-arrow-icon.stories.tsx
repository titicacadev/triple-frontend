import type { Meta, StoryObj } from '@storybook/react'

import { LeftArrowIcon } from './left-arrow-icon'

export default {
  title: 'kint5-core-elements / Icons / Left Arrow icon',
  component: LeftArrowIcon,
} as Meta<typeof LeftArrowIcon>

export const Default: StoryObj<typeof LeftArrowIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
