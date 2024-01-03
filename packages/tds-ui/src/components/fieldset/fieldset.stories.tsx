import type { Meta, StoryObj } from '@storybook/react'

import { Fieldset } from './fieldset'
import { FieldsetLegend } from './fieldset-legend'
import { useFieldset } from './use-fieldset'

const meta: Meta<typeof Fieldset> = {
  title: 'tds-ui / Fieldset',
  component: Fieldset,
}

export default meta

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

type Story = StoryObj<typeof Fieldset>

export const Default: Story = {
  render: (args) => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </Fieldset>
    )
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </Fieldset>
    )
  },
}

export const Required: Story = {
  args: {
    isRequired: true,
  },
  render: (args) => {
    return (
      <Fieldset {...args}>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </Fieldset>
    )
  },
}
