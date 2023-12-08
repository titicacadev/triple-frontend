import type { Meta, StoryObj } from '@storybook/react'

import { CaretDownIcon } from './caret-down-icon'

export default {
  title: 'kint5-core-elements / Icons / Caret Down Icon',
  component: CaretDownIcon,
} as Meta<typeof CaretDownIcon>

export const Default: StoryObj<typeof CaretDownIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
