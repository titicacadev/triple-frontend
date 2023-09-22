import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from '../checkbox'

import { CheckboxGroup } from './checkbox-group'

export default {
  title: 'core-elements / CheckboxGroup',
  component: CheckboxGroup,
} as Meta<typeof CheckboxGroup>

export const Default: StoryFn<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup name="options" label="Label" help="Help message">
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Disabled: StoryFn<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup name="options" label="Label" help="Help message" disabled>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Required: StoryFn<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup name="options" label="Label" help="Help message" required>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Error: StoryFn<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup
      name="options"
      label="Label"
      help="Help message"
      error="Error message"
    >
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Controlled: StoryFn<typeof CheckboxGroup> = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <CheckboxGroup
      name="options"
      label="Label"
      help="Help message"
      value={value}
      onChange={(value) => setValue(value)}
    >
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}
