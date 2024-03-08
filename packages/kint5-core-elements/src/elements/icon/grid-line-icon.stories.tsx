import type { Meta, StoryObj } from '@storybook/react'

import { GridLineIcon } from './grid-line-icon'

export default {
  title: 'kint5-core-elements / Icons / Grid Line Icon',
  component: GridLineIcon,
} as Meta<typeof GridLineIcon>

export const Default: StoryObj<typeof GridLineIcon> = {
  args: {
    color: '#000',
    css: { width: '24px', height: '24px' },
  },
}
