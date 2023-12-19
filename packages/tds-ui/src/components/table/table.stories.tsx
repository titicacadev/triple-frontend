import type { Meta, StoryObj } from '@storybook/react'

import { Table } from './table'

const meta: Meta<typeof Table> = {
  title: 'tds-ui / Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: '사용자에게 데이터를 표형식으로 보여주는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Table>

export const Horizontal: Story = {
  name: '가로 테이블',
  args: {
    type: 'horizontal',
    head: [
      { text: '목적지' },
      { text: '요금 / 소요시간' },
      { text: '운행간격' },
    ],
    body: [
      [{ text: '난바 OCAT' }, { text: '1,050엔 / 45분' }, { text: '30분' }],
      [{ text: '오사카' }, { text: '1,550엔 / 70분' }, { text: '30분' }],
      [{ text: '신우메다시티' }, { text: '1,550엔 / 75분' }, { text: '30분' }],
      [{ text: '신사이바시' }, { text: '1,550엔 / 70분' }, { text: '30분' }],
      [{ text: '난코' }, { text: '1,550엔 / 45분' }, { text: '70분' }],
    ],
  },
  render: (args) => {
    return <Table {...args} />
  },
}

export const Vertical: Story = {
  name: '세로 테이블',
  args: {
    type: 'vertical',
    head: [
      { text: '루트' },
      { text: '요금' },
      { text: '소요시간' },
      { text: '운행간격' },
    ],
    body: [
      [{ text: '간사이 공항 → JR 교토역' }],
      [{ text: '하루카 편도 3,370엔 이코카 & 하루카 편도 3,600엔' }],
      [{ text: '1시간 15분' }],
      [{ text: '시간당 급행 2대 / 일반 3대' }],
    ],
  },
  render: (args) => {
    return <Table {...args} />
  },
}
