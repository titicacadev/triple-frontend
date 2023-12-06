import type { Meta, StoryObj } from '@storybook/react'

import { EmptyHouseIcon } from './empty-house-icon'

export default {
  title: 'kint5-core-elements / Icons / Empty House Icon',
  component: EmptyHouseIcon,
} as Meta<typeof EmptyHouseIcon>

export const Default: StoryObj<typeof EmptyHouseIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
