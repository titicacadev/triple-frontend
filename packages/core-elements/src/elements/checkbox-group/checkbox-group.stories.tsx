import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Checkbox } from '../checkbox'

import { CheckboxGroup } from './checkbox-group'

export default {
  title: 'core-elements / CheckboxGroup',
  component: CheckboxGroup,
} as ComponentMeta<typeof CheckboxGroup>

export const Default: ComponentStory<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup name="options" label="Label" help="Help message">
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Disabled: ComponentStory<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup name="options" label="Label" help="Help message" disabled>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Required: ComponentStory<typeof CheckboxGroup> = () => {
  return (
    <CheckboxGroup name="options" label="Label" help="Help message" required>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}

export const Error: ComponentStory<typeof CheckboxGroup> = () => {
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

export const Controlled: ComponentStory<typeof CheckboxGroup> = () => {
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
