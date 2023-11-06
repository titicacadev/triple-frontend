import type { Meta, StoryObj } from '@storybook/react'

import { FlagIcon } from './flag-icon'

export default {
  title: 'kint5-core-elements / Icons / Flag icon',
  component: FlagIcon,
} as Meta<typeof FlagIcon>

export const Default: StoryObj<typeof FlagIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#B6BBC1',
  },
}
