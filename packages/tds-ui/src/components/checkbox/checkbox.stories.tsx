import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'tds-ui (Form) / Checkbox ',
  component: Checkbox,
  args: {
    variant: 'square',
  },
  argTypes: {
    name: { type: 'string' },
    variant: {
      control: 'radio',
      options: ['square', 'round'],
    },
    checkboxSize: {
      control: 'number',
      description: '체크박스의 크기를 지정합니다.',
      value: 26,
    },
    checked: { type: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 수많은 선택 사항에서 여러 개를 선택할 수 있도록 제공하는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Square: Story = {
  args: { name: 'checkbox' },
}

export const SquareChecked: Story = {
  args: {
    name: 'checkbox',
    checked: true,
  },
}

export const Round: Story = {
  args: {
    name: 'checkbox',
    variant: 'round',
  },
}

export const RoundChecked: Story = {
  args: {
    name: 'checkbox',
    variant: 'round',
    checked: true,
  },
}

export const WithText: Story = {
  args: {
    name: 'checkbox',
    variant: 'square',
    checked: true,
    children: '개인정보 동의',
  },
}
