import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import { useState } from 'react'

import { Confirm } from './confirm'

export default {
  title: 'modals / Confirm',
  component: Confirm,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof Confirm>

export const Default: ComponentStoryObj<typeof Confirm> = {
  args: {
    open: true,
    title: '요금 변동을 확인해주세요',
    children:
      '유류할증료 및 기타세금에 변동이 있어 항공권의 총 요금이 변경되었습니다. 이 요금으로 결제를 진행하시겠습니까?',
    cancelText: '예약 취소',
    confirmText: '네, 진행합니다.',
  },
}

export const Controlled: ComponentStory<typeof Confirm> = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>열기</button>
      <Confirm
        open={open}
        title="요금 변동을 확인해주세요"
        onClose={() => setOpen(false)}
      >
        유류할증료 및 기타세금에 변동이 있어 항공권의 총 요금이 변경되었습니다.
        이 요금으로 결제를 진행하시겠습니까?
      </Confirm>
    </>
  )
}
