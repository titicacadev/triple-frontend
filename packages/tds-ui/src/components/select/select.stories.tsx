import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta: Meta<typeof Select> = {
  title: 'tds-ui / Select',
  component: Select,
  argTypes: {
    placeholder: { type: 'string' },
    label: { type: 'string' },
    error: { if: { arg: 'help', truthy: false }, type: 'string' },
    help: { if: { arg: 'error', truthy: false }, type: 'string' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 옵션 선택을 제공할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Select>

const STORY_OPTIONS = [
  {
    label: '12:00',
    value: '12:00',
  },
  {
    label: '12:10',
    value: '12:10',
  },
  {
    label: '12:20',
    value: '12:20',
  },
]

export const Default: Story = {
  args: {
    value: '',
    placeholder: '시간을 선택해주세요',
    options: STORY_OPTIONS,
  },
}

export const Selected: Story = {
  args: {
    value: '12:00',
    placeholder: '시간을 선택해주세요',
    options: STORY_OPTIONS,
  },
}

export const WithLabel: Story = {
  args: {
    value: '',
    label: '투어티켓 시간',
    placeholder: '시간을 선택해주세요',
    options: STORY_OPTIONS,
  },
}

export const WithHelpMessage: Story = {
  args: {
    value: '',
    label: '투어티켓 시간',
    placeholder: '시간을 선택해주세요',
    help: 'Help text',
    options: STORY_OPTIONS,
  },
}

export const WithErrorMessage: Story = {
  args: {
    value: '',
    label: '투어티켓 시간',
    placeholder: '시간을 선택해주세요',
    error: 'Error text',
    options: STORY_OPTIONS,
  },
}
