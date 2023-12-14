import type { Meta, StoryFn } from '@storybook/react'

import { CheckboxBase } from './checkbox-base'

export default {
  title: 'tds-ui / CheckboxBase',
  component: CheckboxBase,
} as Meta<typeof CheckboxBase>

export const Variants: StoryFn<typeof CheckboxBase> = () => {
  return (
    <>
      <div>
        <CheckboxBase variant="square" />
        <CheckboxBase variant="square" checked />
      </div>
      <div>
        <CheckboxBase variant="round" />
        <CheckboxBase variant="round" checked />
      </div>
    </>
  )
}
