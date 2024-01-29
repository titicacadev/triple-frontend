import type { Meta, StoryObj } from '@storybook/react'

import { CaretLeftIcon } from './caret-left-icon'

export default {
  title: 'kint5-core-elements / Icons / Caret Left Icon',
  component: CaretLeftIcon,
} as Meta<typeof CaretLeftIcon>

export const Default: StoryObj<typeof CaretLeftIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
