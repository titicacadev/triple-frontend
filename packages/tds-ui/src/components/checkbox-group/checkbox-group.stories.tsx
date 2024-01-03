import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Checkbox } from '../checkbox'

import { CheckboxGroup } from './checkbox-group'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'tds-ui / CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    docs: {
      description: {
        component: 'Checkbox를 그룹화하는 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CheckboxGroup>

export const Default: Story = {
  args: {
    name: 'options',
    label: 'Label',
    value: [],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const onChange = (value: string[]) => {
      updateArgs({ value })
    }
    return (
      <CheckboxGroup {...args} value={value} onChange={onChange}>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </CheckboxGroup>
    )
  },
}

export const Disabled: Story = {
  args: {
    name: 'options',
    label: 'Label',
    value: [],
    disabled: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const onChange = (value: string[]) => {
      updateArgs({ value })
    }
    return (
      <CheckboxGroup {...args} value={value} onChange={onChange}>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </CheckboxGroup>
    )
  },
}

export const Required: Story = {
  args: {
    name: 'options',
    label: 'Label',
    value: [],
    required: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const onChange = (value: string[]) => {
      updateArgs({ value })
    }
    return (
      <CheckboxGroup {...args} value={value} onChange={onChange}>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </CheckboxGroup>
    )
  },
}

export const WithHelpMessage: Story = {
  args: {
    name: 'options',
    label: 'Label',
    value: [],
    help: 'Help message',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const onChange = (value: string[]) => {
      updateArgs({ value })
    }
    return (
      <CheckboxGroup {...args} value={value} onChange={onChange}>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </CheckboxGroup>
    )
  },
}

export const WithErrorMessage: Story = {
  args: {
    name: 'options',
    label: 'Label',
    value: [],
    error: 'Error message',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const onChange = (value: string[]) => {
      updateArgs({ value })
    }
    return (
      <CheckboxGroup {...args} value={value} onChange={onChange}>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </CheckboxGroup>
    )
  },
}
