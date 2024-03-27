import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '../radio/radio'

import { RadioGroup } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'tds-ui / RadioGroup',
  component: RadioGroup,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
    name: { type: 'string' },
    value: { type: 'string' },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
    label: { type: 'string' },
    error: { type: 'string' },
    help: { type: 'string' },
  },
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
  args: {
    name: 'option',
    value: 'a',
    children: (
      <>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    name: 'option',
    value: 'a',
    disabled: true,
    children: (
      <>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </>
    ),
  },
}

export const Required: Story = {
  args: {
    name: 'option',
    value: 'a',
    required: true,
    children: (
      <>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </>
    ),
  },
}

export const WithLabel: Story = {
  args: {
    name: 'option',
    value: 'a',
    label: '라디오',
    children: (
      <>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </>
    ),
  },
}

export const WithHelpMessage: Story = {
  args: {
    name: 'option',
    value: 'a',
    label: '라디오',
    help: 'Help text',
    children: (
      <>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </>
    ),
  },
}

export const WithErrorMessage: Story = {
  args: {
    name: 'option',
    value: 'a',
    label: '라디오',
    error: 'Error text',
    children: (
      <>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </>
    ),
  },
}
