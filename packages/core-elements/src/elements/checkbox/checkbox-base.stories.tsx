import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CheckboxBase } from './checkbox-base'

export default {
  title: 'core-elements / CheckboxBase',
  component: CheckboxBase,
} as ComponentMeta<typeof CheckboxBase>

export const Variants: ComponentStory<typeof CheckboxBase> = () => {
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
