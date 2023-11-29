import type { Meta, StoryObj } from '@storybook/react'

import { EmptyLocationIcon } from './empty-location-icon'

export default {
  title: 'kint5-core-elements / Icons / Empty Location icon',
  component: EmptyLocationIcon,
} as Meta<typeof EmptyLocationIcon>

export const Default: StoryObj<typeof EmptyLocationIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
