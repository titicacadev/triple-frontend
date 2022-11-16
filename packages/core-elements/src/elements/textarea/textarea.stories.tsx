import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Textarea } from './textarea'

export default {
  title: 'core-elements / Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>

export const Default: ComponentStoryObj<typeof Textarea> = {
  args: {
    error: false,
    label: '요청사항',
    placeholder: '요청사항을 입력해주세요',
    help: '고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다.',
  },
}

export const Required: ComponentStoryObj<typeof Textarea> = {
  args: {
    ...Default.args,
    required: true,
  },
}

export const Error: ComponentStoryObj<typeof Textarea> = {
  args: {
    ...Default.args,
    error: '요청사항은 필수 입력 사항입니다.',
  },
}
