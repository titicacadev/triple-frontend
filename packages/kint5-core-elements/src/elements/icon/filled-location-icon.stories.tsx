import type { Meta, StoryObj } from '@storybook/react'

import { FilledLocationIcon } from './filled-location-icon'

export default {
  title: 'kint5-core-elements / Icons / Filled Location icon',
  component: FilledLocationIcon,
} as Meta<typeof FilledLocationIcon>

export const Default: StoryObj<typeof FilledLocationIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#B6BBC1',
  },
}
