import type { Meta, StoryObj } from '@storybook/react'

import { FilledCheckboxIcon } from './filled-checkbox-icon'

export default {
  title: 'kint5-core-elements / Icons / Filled Checkbox icon',
  component: FilledCheckboxIcon,
} as Meta<typeof FilledCheckboxIcon>

export const Default: StoryObj<typeof FilledCheckboxIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
