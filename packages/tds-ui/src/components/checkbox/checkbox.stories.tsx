import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from './checkbox'

export default {
  title: 'tds-ui / Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>

export const Default: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return <Checkbox {...args}>Option</Checkbox>
  },
}

export const Controlled: StoryFn<typeof Checkbox> = () => {
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
