import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'tds-ui / Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: '말풍선을 노출하는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

const Base = styled.div`
  position: relative;
  margin: 50px;
  border: solid 1px black;
  padding: 10px;
`

export const ArrowTop: Story = {
  args: {
    label: '모든 호텔 보기',
    pointing: {
      vertical: 'top',
      horizontal: 'left',
      horizontalOffset: 26,
    },
    nowrap: false,
    backgroundColor: 'rgba(13, 208, 175, 1)',
  },
  render: (args) => {
    return (
      <Base>
        툴팁 표시 대상
        <Tooltip {...args} />
      </Base>
    )
  },
}

export const ArrowBottom: Story = {
  args: {
    label: '쿠폰사용시 -15,000원 더 할인!',
    positioning: { top: -25 },
    borderRadius: '30',
    onClick: () => {},
  },
  render: (args) => {
    return (
      <Base>
        툴팁 표시 대상
        <Tooltip {...args} />
      </Base>
    )
  },
}
