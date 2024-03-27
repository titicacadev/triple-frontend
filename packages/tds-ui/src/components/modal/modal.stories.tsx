import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './modal'

const meta: Meta<typeof Modal> = {
  title: 'tds-ui / Modal',
  component: Modal,
  args: {
    open: false,
    flexible: false,
  },
  argTypes: {
    open: { type: 'boolean' },
    flexible: { type: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '같은 브라우저 내부에서 상위 레이어를 띄우는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    open: true,
    children: (
      <>
        <Modal.Body>
          <Modal.Title>제목</Modal.Title>
          <Modal.Description>부연설명 영역입니다.</Modal.Description>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action color="blue">닫기</Modal.Action>
        </Modal.Actions>
      </>
    ),
  },
}

export const Flexible: Story = {
  args: {
    open: true,
    flexible: true,
    children: (
      <>
        <Modal.Body>
          <Modal.Title>제목</Modal.Title>
          <Modal.Description>부연설명 영역입니다.</Modal.Description>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action color="blue">닫기</Modal.Action>
        </Modal.Actions>
      </>
    ),
  },
}
