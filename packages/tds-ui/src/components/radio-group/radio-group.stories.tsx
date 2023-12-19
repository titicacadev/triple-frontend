import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Radio } from '../radio/radio'

import { RadioGroup } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'tds-ui / RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: '개별 라디오를 묶어줄 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  name: '기본',
  args: {
    name: 'option',
    value: 'a',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return (
      <RadioGroup {...args} value={value} onChange={handleChange}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    )
  },
}

export const Disabled: Story = {
  name: '비활성화',
  args: {
    name: 'option',
    value: 'a',
    disabled: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return (
      <RadioGroup {...args} value={value} onChange={handleChange}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    )
  },
}

export const Required: Story = {
  name: '필수',
  args: {
    name: 'option',
    value: 'a',
    required: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return (
      <RadioGroup {...args} value={value} onChange={handleChange}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    )
  },
}

export const WithLabel: Story = {
  name: '스티커',
  args: {
    name: 'option',
    value: 'a',
    label: '라디오',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return (
      <RadioGroup {...args} value={value} onChange={handleChange}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    )
  },
}

export const WithHelpMessage: Story = {
  name: '가이드 메시지',
  args: {
    name: 'option',
    value: 'a',
    label: '라디오',
    help: 'Help text',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return (
      <RadioGroup {...args} value={value} onChange={handleChange}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    )
  },
}

export const WithErrorMessage: Story = {
  name: '에러 메시지',
  args: {
    name: 'option',
    value: 'a',
    label: '라디오',
    error: 'Error text',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: string) => {
      updateArgs({ value })
    }

    return (
      <RadioGroup {...args} value={value} onChange={handleChange}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    )
  },
}
