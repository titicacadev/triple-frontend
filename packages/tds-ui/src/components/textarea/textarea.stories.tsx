import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'tds-ui (Form) / Textarea',
  component: Textarea,
  args: { required: false },
  argTypes: {
    required: { type: 'boolean' },
    label: { type: 'string' },
    error: { if: { arg: 'help', truthy: false }, type: 'string' },
    help: { if: { arg: 'error', truthy: false }, type: 'string' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 여러 줄의 긴 문장을 입력할 수 있도록 제공하는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: '요청사항을 입력해주세요.',
  },
}

export const Required: Story = {
  args: {
    label: '요청사항',
    required: true,
    placeholder: '요청사항을 입력해주세요.',
  },
}

export const WithLabel: Story = {
  args: {
    label: '요청사항',
    placeholder: '요청사항을 입력해주세요.',
  },
}

export const WithHelpMessage: Story = {
  args: {
    label: '요청사항',
    placeholder: '요청사항을 입력해주세요.',
    help: '고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다.',
  },
}

export const WithErrorMessage: Story = {
  args: {
    label: '요청사항',
    placeholder: '요청사항을 입력해주세요.',
    error: '요청사항은 필수 입력 사항입니다.',
  },
}
