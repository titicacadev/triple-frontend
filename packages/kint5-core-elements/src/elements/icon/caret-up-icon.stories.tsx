import type { Meta, StoryObj } from '@storybook/react'

import { CaretUpIcon } from './caret-up-icon'

export default {
  title: 'kint5-core-elements / Icons / Caret Up Icon',
  component: CaretUpIcon,
} as Meta<typeof CaretUpIcon>

export const Default: StoryObj<typeof CaretUpIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
