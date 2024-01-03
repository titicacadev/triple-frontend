import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Confirm } from './confirm'

const meta: Meta<typeof Confirm> = {
  title: 'tds-ui / Confirm',
  component: Confirm,
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
    title: '요금 변동을 확인해주세요',
    children:
      '유류할증료 및 기타세금에 변동이 있어 항공권의 총 요금이 변경되었습니다. 이 요금으로 결제를 진행하시겠습니까?',
    cancelText: '예약 취소',
    confirmText: '네, 진행합니다.',
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs()

    const onClose = () => {
      updateArgs({ open: !open })
    }

    if (!open) {
      return (
        <button onClick={() => updateArgs({ open: true })}>모달 열기</button>
      )
    }

    return <Confirm {...args} onClose={onClose} />
  },
}
