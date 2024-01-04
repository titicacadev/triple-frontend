import type { Meta, StoryObj } from '@storybook/react'

import { NumericSpinner } from './numeric-spinner'

const meta: Meta<typeof NumericSpinner> = {
  title: 'tds-ui / NumericSpinner',
  component: NumericSpinner,
  args: {
    size: 'small',
    value: 0,
    min: 0,
    // Infinity를 못읽어서 9999로 표현
    max: 9999,
    step: 1,
  },
  argTypes: {
    label: { type: 'string' },
    sublabel: { type: 'string' },
    strikeLabel: { type: 'string' },
    value: { type: 'number' },
    disabled: { type: 'boolean' },
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
    size: {
      control: 'select',
      options: [
        'mini',
        'tiny',
        'big',
        'huge',
        'massive',
        'small',
        'medium',
        'large',
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 버튼을 통해 숫자를 조절할 수 있는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof NumericSpinner>

export const Default: Story = {
  args: {
    label: '성인',
  },
}

export const SubLabel: Story = {
  args: {
    label: '성인',
    sublabel: '탑승객 수를 의미합니다.',
  },
}
export const StrikeLabel: Story = {
  args: {
    label: '성인',
    strikeLabel: '중앙에 줄이 그어집니다.',
  },
}

export const Disabled: Story = {
  args: {
    label: '성인',
    disabled: true,
  },
}
