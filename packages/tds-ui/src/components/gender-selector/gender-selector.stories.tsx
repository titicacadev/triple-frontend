import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { GenderSelector } from './gender-selector'

const meta: Meta<typeof GenderSelector> = {
  title: 'tds-ui / GenderSelector',
  component: GenderSelector,
  parameters: {
    docs: {
      description: {
        component: '성별을 선택할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof GenderSelector>

export const Default: Story = {
  name: '기본',
  args: {
    name: 'gender',
    value: 'MALE',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return <GenderSelector {...args} value={value} onChange={handleChange} />
  },
}

export const Disabled: Story = {
  name: '비활성화',
  args: {
    name: 'gender',
    value: 'MALE',
    disabled: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return <GenderSelector {...args} value={value} onChange={handleChange} />
  },
}

export const Required: Story = {
  name: '필수',
  args: {
    name: 'gender',
    value: 'MALE',
    required: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return <GenderSelector {...args} value={value} onChange={handleChange} />
  },
}

export const WithLabel: Story = {
  name: '스티커',
  args: {
    name: 'gender',
    value: 'MALE',
    label: '성별 선택',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return <GenderSelector {...args} value={value} onChange={handleChange} />
  },
}

export const WithHelpMessage: Story = {
  name: '가이드 메시지',
  args: {
    name: 'gender',
    value: 'MALE',
    help: '가이드 메시지',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return <GenderSelector {...args} value={value} onChange={handleChange} />
  },
}

export const WithErrorMessage: Story = {
  name: '에러 메시지',
  args: {
    name: 'gender',
    value: 'MALE',
    error: '에러 메시지',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return <GenderSelector {...args} value={value} onChange={handleChange} />
  },
}
