import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Radio } from '../radio/radio'

import { RadioGroup } from './radio-group'

export default {
  title: 'tds-ui / RadioGroup',
  component: RadioGroup,
} as Meta<typeof RadioGroup>

export const Default: StoryFn<typeof RadioGroup> = () => {
  return (
    <RadioGroup name="option" label="Label" help="Help message">
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Disabled: StoryFn<typeof RadioGroup> = () => {
  return (
    <RadioGroup name="option" label="Label" help="Help message" disabled>
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Required: StoryFn<typeof RadioGroup> = () => {
  return (
    <RadioGroup name="option" label="Label" help="Help message" required>
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}

export const Error: StoryFn<typeof RadioGroup> = () => {
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

export const Controlled: StoryFn<typeof RadioGroup> = () => {
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
