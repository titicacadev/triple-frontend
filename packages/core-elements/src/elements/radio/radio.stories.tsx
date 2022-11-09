import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { useState } from 'react'

import { Radio } from './radio'

export default {
  title: 'Core-Elements / Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>

export const Default: ComponentStoryObj<typeof Radio> = {
  args: {
    children: 'Radio',
  },
}

export const Controlled = () => {
  const [value, setValue] = useState<string>()

  return (
    <Radio
      value="a"
      checked={value === 'a'}
      onChange={(event) => setValue(event.target.value)}
    >
      Option A
    </Radio>
  )
}
