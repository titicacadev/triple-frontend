import type { Meta, StoryFn } from '@storybook/react'

import { InputAreaUI, InputAreaUIProps } from './index'

export default {
  title: 'chat / InputArea',
  component: InputAreaUI,
  argTypes: {},
} as Meta<typeof InputAreaUI>

const Template: StoryFn<InputAreaUIProps> = (args) => <InputAreaUI {...args} />

export const Default = {
  render: Template,

  args: {
    placeholder: '문의 내용을 입력하세요',
    inputValue: '',
    setInputValue: () => {},
    onImageUpload: () => {},
    onSendMessage: () => {},
  },
}
