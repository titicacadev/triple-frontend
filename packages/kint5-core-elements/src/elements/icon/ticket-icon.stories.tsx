import type { Meta, StoryObj } from '@storybook/react'

import { TicketIcon } from './ticket-icon'

export default {
  title: 'kint5-core-elements / Icons / Ticket Icon',
  component: TicketIcon,
} as Meta<typeof TicketIcon>

export const Default: StoryObj<typeof TicketIcon> = {
  args: {
    width: 24,
    height: 24,
    color: '#B6BBC1',
  },
}
