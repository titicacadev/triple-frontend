import type { Meta, StoryObj } from '@storybook/react'

import { GenderSelector } from './gender-selector'

const meta: Meta<typeof GenderSelector> = {
  title: 'tds-ui / GenderSelector',
  component: GenderSelector,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
    name: { type: 'string' },
    value: { control: 'radio', options: ['MALE', 'FEMALE'] },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
    label: { type: 'string' },
    help: { type: 'string' },
    error: { type: 'string' },
  },
  parameters: {
    docs: {
      description: {
        component: '성별을 선택할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof GenderSelector>

export const Default: Story = {
  args: { name: 'gender', value: 'MALE' },
}

export const Disabled: Story = {
  args: {
    name: 'gender',
    value: 'MALE',
    disabled: true,
  },
}

export const Required: Story = {
  args: { name: 'gender', value: 'MALE', required: true },
}

export const WithLabel: Story = {
  args: {
    name: 'gender',
    value: 'MALE',
    label: '성별 선택',
  },
}

export const WithHelpMessage: Story = {
  args: {
    name: 'gender',
    value: 'MALE',
    help: '가이드 메시지',
  },
}

export const WithErrorMessage: Story = {
  args: {
    name: 'gender',
    value: 'MALE',
    error: '에러 메시지',
  },
}
