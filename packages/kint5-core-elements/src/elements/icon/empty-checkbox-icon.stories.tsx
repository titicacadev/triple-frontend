import type { Meta, StoryObj } from '@storybook/react'

import { EmptyCheckboxIcon } from './empty-checkbox-icon'

export default {
  title: 'kint5-core-elements / Icons / Empty Checkbox icon',
  component: EmptyCheckboxIcon,
} as Meta<typeof EmptyCheckboxIcon>

export const Default: StoryObj<typeof EmptyCheckboxIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#747C86',
  },
}
