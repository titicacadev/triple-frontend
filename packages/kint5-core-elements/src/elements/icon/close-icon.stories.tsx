import type { Meta, StoryObj } from '@storybook/react'

import { CloseIcon } from './close-icon'

export default {
  title: 'kint5-core-elements / Icons / Close icon',
  component: CloseIcon,
} as Meta<typeof CloseIcon>

export const Default: StoryObj<typeof CloseIcon> = {
  args: {
    width: 22,
    height: 21,
    color: '#000',
  },
}
