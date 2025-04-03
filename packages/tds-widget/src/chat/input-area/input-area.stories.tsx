import { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { InputAreaUI, InputAreaUIProps, NolInputAreaUI } from './index'

export default {
  title: 'tds-widget / chat / InputArea',
  component: InputAreaUI,
  argTypes: {},
} as Meta<typeof InputAreaUI>

const Template: StoryFn<InputAreaUIProps> = (args) => <InputAreaUI {...args} />

export const Default = {
  render: ({
    inputValue: initialInputValue,
    ...args
  }: Omit<InputAreaUIProps, 'setInputValue'>) => {
    const [inputValue, setInputValue] = useState(initialInputValue)

    return (
      <Template
        inputValue={inputValue}
        setInputValue={setInputValue}
        {...args}
      />
    )
  },

  args: {
    placeholder: '문의 내용을 입력하세요',
    inputValue: '',
    onImageUpload: () => {},
    onSendMessage: () => {},
  },
}

const NolTemplate: StoryFn<InputAreaUIProps> = (args) => (
  <NolInputAreaUI {...args} />
)

export const Nol = {
  render: ({
    inputValue: initialInputValue,
    ...args
  }: Omit<InputAreaUIProps, 'setInputValue'>) => {
    const [inputValue, setInputValue] = useState(initialInputValue)

    return (
      <NolTemplate
        inputValue={inputValue}
        setInputValue={setInputValue}
        {...args}
      />
    )
  },

  args: {
    placeholder: '문의 내용을 입력하세요',
    inputValue: '',
    onImageUpload: () => {},
    onSendMessage: () => {},
  },
}
