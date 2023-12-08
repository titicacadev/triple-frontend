import type { Meta, StoryObj } from '@storybook/react'

import { CaretRightIcon } from './caret-right-icon'

export default {
  title: 'kint5-core-elements / Icons / Caret Right Icon',
  component: CaretRightIcon,
} as Meta<typeof CaretRightIcon>

export const Default: StoryObj<typeof CaretRightIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
