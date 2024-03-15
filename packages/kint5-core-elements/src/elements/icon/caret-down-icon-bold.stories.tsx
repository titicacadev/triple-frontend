import type { Meta, StoryObj } from '@storybook/react'

import { CaretDownIconBold } from './caret-down-icon-bold'

export default {
  title: 'kint5-core-elements / Icons / Caret Down Icon Bold',
  component: CaretDownIconBold,
} as Meta<typeof CaretDownIconBold>

export const Default: StoryObj<typeof CaretDownIconBold> = {
  args: {
    color: '#000',
    width: '24px',
    height: '24px',
  },
}
