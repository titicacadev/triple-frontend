import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '../checkbox'

import { CheckboxGroup } from './checkbox-group'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'tds-ui / CheckboxGroup',
  component: CheckboxGroup,
  args: {
    value: [],
    disabled: false,
    required: false,
    children: (
      <>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </>
    ),
  },
  argTypes: {
    name: { type: 'string' },
    disabled: { type: 'boolean' },
    required: { type: 'boolean' },
    label: { type: 'string' },
    error: { if: { arg: 'help', truthy: false }, type: 'string' },
    help: { if: { arg: 'error', truthy: false }, type: 'string' },
    children: {
      table: {
        disable: true,
      },
    },
  },
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
  },
}

export const Disabled: Story = {
  args: {
    name: 'options',
    label: 'Label',
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    name: 'options',
    label: 'Label',
    required: true,
  },
}

export const WithHelpMessage: Story = {
  args: {
    name: 'options',
    label: 'Label',
    help: 'Help message',
    children: (
      <>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </>
    ),
  },
}

export const WithErrorMessage: Story = {
  args: {
    name: 'options',
    label: 'Label',
    error: 'Error message',
    children: (
      <>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c">Option C</Checkbox>
      </>
    ),
  },
}
