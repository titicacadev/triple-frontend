import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from './checkbox'

export default {
  title: 'core-elements / Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

export const Default: ComponentStory<typeof Checkbox> = (args) => {
  return <Checkbox {...args}>Option</Checkbox>
}

export const Controlled: ComponentStory<typeof Checkbox> = () => {
  const [checked, setChecekd] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecekd(event.target.checked)}
    >
      Option
    </Checkbox>
  )
}
