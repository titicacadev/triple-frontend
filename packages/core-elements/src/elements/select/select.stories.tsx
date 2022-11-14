import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Select } from './select'

export default {
  title: 'core-elements / Select',
  component: Select,
} as ComponentMeta<typeof Select>

export const Default: ComponentStoryObj<typeof Select> = {
  args: {
    label: '투어티켓 시간',
    help: '고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다.',
    placeholder: '시간을 선택해주세요',
    options: [
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
    ],
  },
}

export const Error: ComponentStoryObj<typeof Select> = {
  args: {
    ...Default.args,
    error: '선택할 수 없는 시간입니다.',
  },
}
