import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import { useState } from 'react'

import { GenderSelector } from './gender-selector'

export default {
  title: 'core-elements / GenderSelector',
  component: GenderSelector,
} as ComponentMeta<typeof GenderSelector>

export const Default: ComponentStoryObj<typeof GenderSelector> = {
  args: {},
}

export const Controlled: ComponentStory<typeof GenderSelector> = () => {
  const [value, setValue] = useState('MALE')

  return <GenderSelector name="gender" value={value} onChange={setValue} />
}
