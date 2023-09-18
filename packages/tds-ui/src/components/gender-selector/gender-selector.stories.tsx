import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { GenderSelector } from './gender-selector'

export default {
  title: 'core-elements / GenderSelector',
  component: GenderSelector,
} as Meta<typeof GenderSelector>

export const Default: StoryObj<typeof GenderSelector> = {
  args: {},
}

export const Controlled: StoryFn<typeof GenderSelector> = () => {
  const [value, setValue] = useState('MALE')

  return <GenderSelector name="gender" value={value} onChange={setValue} />
}
