import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Input } from './input'

export default {
  title: 'core-elements / Input',
  component: Input,
} as ComponentMeta<typeof Input>

export const Default: ComponentStoryObj<typeof Input> = {
  args: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
    help: '고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다.',
  },
}

export const Required: ComponentStoryObj<typeof Input> = {
  args: {
    ...Default.args,
    required: true,
  },
}

export const Error: ComponentStoryObj<typeof Input> = {
  args: {
    ...Default.args,
    error: '이름은 필수 입력 사항입니다.',
  },
}

export const Mask: ComponentStoryObj<typeof Input> = {
  args: {
    ...Default.args,
    mask: '99/99',
    value: 1230,
  },
}
