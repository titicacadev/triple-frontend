import type { Meta, StoryObj } from '@storybook/react'

import { Fieldset } from './fieldset'
import { FieldsetLegend } from './fieldset-legend'
import { useFieldset } from './use-fieldset'

export default {
  title: 'tds-ui / Fieldset',
  component: Fieldset,
} as Meta<typeof Fieldset>

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

export const Default: StoryObj<typeof Fieldset> = {
  render: (args) => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </Fieldset>
    )
  },
}

export const Disabled: StoryObj<typeof Fieldset> = {
  render: (args) => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </Fieldset>
    )
  },

  args: {
    isDisabled: true,
  },
}

export const Required: StoryObj<typeof Fieldset> = {
  render: (args) => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </Fieldset>
    )
  },

  args: {
    isRequired: true,
  },
}
