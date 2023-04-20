import { ComponentMeta, ComponentStoryFn } from '@storybook/react'

import { Fieldset } from './fieldset'
import { FieldsetLegend } from './fieldset-legend'
import { useFieldset } from './use-fieldset'

export default {
  title: 'core-elements / Fieldset',
  component: Fieldset,
} as ComponentMeta<typeof Fieldset>

const CustomInputGroup = () => {
  const { isRequired } = useFieldset()

  return (
    <div>
      <label style={{ display: 'block' }}>
        Input 1
        <input required={isRequired} />
      </label>
      <label style={{ display: 'block' }}>
        Input 2
        <input required={isRequired} />
      </label>
    </div>
  )
}

export const Default: ComponentStoryFn<typeof Fieldset> = (args) => {
  return (
    <Fieldset {...args}>
      <FieldsetLegend>Label</FieldsetLegend>
      <CustomInputGroup />
    </Fieldset>
  )
}

export const Disabled: ComponentStoryFn<typeof Fieldset> = (args) => {
  return (
    <Fieldset {...args}>
      <FieldsetLegend>Label</FieldsetLegend>
      <CustomInputGroup />
    </Fieldset>
  )
}
Disabled.args = {
  isDisabled: true,
}

export const Required: ComponentStoryFn<typeof Fieldset> = (args) => {
  return (
    <Fieldset {...args}>
      <FieldsetLegend>Label</FieldsetLegend>
      <CustomInputGroup />
    </Fieldset>
  )
}
Required.args = {
  isRequired: true,
}
