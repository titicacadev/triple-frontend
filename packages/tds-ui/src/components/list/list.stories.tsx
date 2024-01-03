import type { Meta, StoryObj } from '@storybook/react'

import { List } from './list'

const meta: Meta<typeof List> = {
  title: 'tds-ui / List',
  component: List,
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 목록 형식으로 정보를 전닿할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    children: (
      <>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </>
    ),
  },
}

export const Marker: Story = {
  args: {
    marker: true,
    children: (
      <>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </>
    ),
  },
}

export const Divided: Story = {
  args: {
    divided: true,
    dividerWeight: 10,
    children: (
      <>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </>
    ),
  },
}
