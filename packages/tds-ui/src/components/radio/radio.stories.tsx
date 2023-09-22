import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Radio } from './radio'

export default {
  title: 'core-elements / Radio',
  component: Radio,
} as Meta<typeof Radio>

export const Default: StoryObj<typeof Radio> = {
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
