import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './alert'

export default {
  title: 'modals / Alert',
  component: Alert,
  parameters: {
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
} as Meta<typeof Alert>

export const Default: StoryObj<typeof Alert> = {
  args: {
    open: true,
    title: '항공사 예약번호',
    children: '대한항공 L5W4NW',
  },
}
