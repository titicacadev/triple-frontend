import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'

const meta: Meta<typeof Label> = {
  title: 'tds-ui / Label',
  component: Label,
  argTypes: {
    radio: { type: 'boolean' },
    selected: {
      if: { arg: 'radio' },
      type: 'boolean',
    },
    promo: { type: 'boolean' },
    color: {
      if: { arg: 'promo' },
      control: 'select',
      options: [
        'blue',
        'red',
        'purple',
        'orange',
        'gray',
        'green',
        'white',
        'skyblue',
        'lightpurple',
        'black',
      ],
    },
    size: {
      if: { arg: 'promo' },
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
    },
    emphasized: { if: { arg: 'promo' }, type: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 다음 행동을 결정하도록 도와주는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: '최신순',
  },
}

export const Radio: Story = {
  args: {
    radio: true,
    children: '최신순',
  },
}

export const Promo: Story = {
  args: {
    promo: true,
    size: 'large',
    color: 'blue',
    children: '프로모션',
  },
}
