import { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { NolThemeProvider } from '../nol-theme-provider'

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
  <NolThemeProvider
    theme={{
      'color-neutral-b-100': 'rgba(41, 41, 45, 1)',
      'color-neutral-w-100': 'rgba(255, 255, 255, 1)',
      'color-neutral-g-50': 'rgba(148, 148, 150, 1)',
      'color-neutral-g-15': 'rgba(223, 223, 224, 1)',
      'color-primary-nol': 'rgba(65, 84, 255, 1)',
    }}
  >
    <NolInputAreaUI {...args} />
  </NolThemeProvider>
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
