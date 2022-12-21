import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'
import { useState } from 'react'

import { NumericSpinner } from './numeric-spinner'

export default {
  title: 'core-elements / NumericSpinner',
  component: NumericSpinner,
} as ComponentMeta<typeof NumericSpinner>

export const Default: ComponentStoryObj<typeof NumericSpinner> = {
  args: {
    label: '성인',
  },
}

export const Disabled: ComponentStoryObj<typeof NumericSpinner> = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const Label: ComponentStory<typeof NumericSpinner> = () => {
  return (
    <>
      <NumericSpinner {...Default.args} />
      <NumericSpinner {...Default.args} sublabel="10,000원" />
      <NumericSpinner {...Default.args} strikeLabel="20,000원" />
      <NumericSpinner
        {...Default.args}
        sublabel="10,000원"
        strikeLabel="20,000원"
      />
    </>
  )
}

export const Size: ComponentStory<typeof NumericSpinner> = () => {
  return (
    <>
      <NumericSpinner {...Default.args} size="tiny" />
      <NumericSpinner {...Default.args} size="medium" />
      <NumericSpinner {...Default.args} size="big" />
    </>
  )
}

export const Controlled: ComponentStory<typeof NumericSpinner> = () => {
  const [value, setValue] = useState(1)

  return <NumericSpinner {...Default.args} value={value} onChange={setValue} />
}
