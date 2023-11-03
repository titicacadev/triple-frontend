import type { Meta, StoryObj } from '@storybook/react'

import { CalenderIcon } from './calendar-icon'

export default {
  title: 'kint5-core-elements / Icons / Calender icon',
  component: CalenderIcon,
} as Meta<typeof CalenderIcon>

export const Default: StoryObj<typeof CalenderIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#000',
  },
}
