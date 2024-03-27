import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'tds-ui / Alert',
  component: Alert,
  args: {
    confirmText: '확인',
  },
  argTypes: {
    open: { type: 'boolean' },
    title: { type: 'string' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 주의를 주거나 알림을 제공하는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof Alert> = {
  args: {
    open: true,
    title: '항공사 예약번호',
    children: '대한항공 L5W4NW',
  },
}
