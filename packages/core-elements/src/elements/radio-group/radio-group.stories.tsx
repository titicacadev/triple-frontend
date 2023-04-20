import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Radio } from '../radio/radio'

import { RadioGroup } from './radio-group'

export default {
  title: 'core-elements / RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>

export const Default: ComponentStory<typeof RadioGroup> = () => {
  return (
    <RadioGroup name="option" label="Label" help="Help message">
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Disabled: ComponentStory<typeof RadioGroup> = () => {
  return (
    <RadioGroup name="option" label="Label" help="Help message" disabled>
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Required: ComponentStory<typeof RadioGroup> = () => {
  return (
    <RadioGroup name="option" label="Label" help="Help message" required>
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Error: ComponentStory<typeof RadioGroup> = () => {
  return (
    <RadioGroup
      name="option"
      label="Label"
      help="Help message"
      error="Error message"
    >
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Controlled: ComponentStory<typeof RadioGroup> = () => {
  const [value, setValue] = useState<string>()

  return (
    <RadioGroup
      name="option"
      label="Label"
      help="Help message"
      value={value}
      onChange={(selectedValue) => setValue(selectedValue)}
    >
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}
