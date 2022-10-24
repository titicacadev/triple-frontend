import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Alert } from './alert'

export default {
  title: 'modals / Alert',
  component: Alert,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof Alert>

export const Default: ComponentStoryObj<typeof Alert> = {
  args: {
    open: true,
    title: '항공사 예약번호',
    children: '대한항공 L5W4NW',
  },
}
