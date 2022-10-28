import { useState } from '@storybook/addons'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'

export default {
  component: CheckboxGroup,
} as ComponentMeta<typeof CheckboxGroup>

export const Default: ComponentStory<typeof CheckboxGroup> = (args) => {
  return (
    <CheckboxGroup {...args}>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}
Default.args = {
  name: 'options',
}

export const Controlled: ComponentStory<typeof CheckboxGroup> = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <CheckboxGroup
      name="options"
      value={value}
      onChange={(value) => setValue(value)}
    >
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <Checkbox value="c">Option C</Checkbox>
    </CheckboxGroup>
  )
}
