import type { Meta, StoryObj } from '@storybook/react'

import { Radio as RadioComponent } from './radio'

const meta: Meta<typeof RadioComponent> = {
  title: 'tds-ui / Radio',
  component: RadioComponent,
  argTypes: {
    name: { type: 'string' },
    checked: { type: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: '라디오 버튼 기능을 제공하는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

export const Radio: StoryObj<typeof RadioComponent> = {
  args: {
    value: 'radio',
    children: '라디오 버튼',
    checked: false,
  },
}

export const RadioChecked: StoryObj<typeof RadioComponent> = {
  args: {
    value: 'radio',
    children: '라디오 버튼',
    checked: true,
  },
}
