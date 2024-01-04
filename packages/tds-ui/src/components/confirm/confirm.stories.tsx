import type { Meta, StoryObj } from '@storybook/react'

import { Confirm } from './confirm'

const meta: Meta<typeof Confirm> = {
  title: 'tds-ui / Confirm',
  component: Confirm,
  args: {
    cancelText: '취소',
    confirmText: '확인',
  },
  argTypes: {
    open: { type: 'boolean' },
    title: { type: 'string' },
    cancelText: { type: 'string' },
    confirmText: { type: 'string' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 다음 행동을 결정하도록 도와주는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof Confirm> = {
  args: {
    open: true,
    title: '제목입니다.',
    children: '본문입니다.',
  },
}
