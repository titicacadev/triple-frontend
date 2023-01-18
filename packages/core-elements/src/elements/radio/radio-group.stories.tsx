import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Radio } from '../radio/radio'

import { RadioGroup } from './radio-group'

export default {
  title: 'core-elements / RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>

export const Default: ComponentStory<typeof RadioGroup> = (args) => {
  return (
    <RadioGroup {...args} name="option">
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
      value={value}
      onChange={(selectedValue) => setValue(selectedValue)}
    >
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <Radio value="c">Option C</Radio>
    </RadioGroup>
  )
}
