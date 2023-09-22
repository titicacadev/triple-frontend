import type { StoryFn, Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { NumericSpinner } from './numeric-spinner'

export default {
  title: 'core-elements / NumericSpinner',
  component: NumericSpinner,
} as Meta<typeof NumericSpinner>

export const Default: StoryObj<typeof NumericSpinner> = {
  args: {
    label: '성인',
  },
}

export const Disabled: StoryObj<typeof NumericSpinner> = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const Label: StoryFn<typeof NumericSpinner> = () => {
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

export const Size: StoryFn<typeof NumericSpinner> = () => {
  return (
    <>
      <NumericSpinner {...Default.args} size="tiny" />
      <NumericSpinner {...Default.args} size="medium" />
      <NumericSpinner {...Default.args} size="big" />
    </>
  )
}

export const Controlled: StoryFn<typeof NumericSpinner> = () => {
  const [value, setValue] = useState(1)

  return <NumericSpinner {...Default.args} value={value} onChange={setValue} />
}
