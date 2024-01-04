import type { Meta, StoryObj } from '@storybook/react'

import { Fieldset } from './fieldset'
import { FieldsetLegend } from './fieldset-legend'
import { useFieldset } from './use-fieldset'

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

const meta: Meta<typeof Fieldset> = {
  title: 'tds-ui / Fieldset',
  component: Fieldset,
  args: {
    isDisabled: false,
    isRequired: false,
    children: (
      <>
        <FieldsetLegend>Label</FieldsetLegend>
        <CustomInputGroup />
      </>
    ),
  },
  argTypes: {
    isDisabled: { type: 'boolean' },
    isRequired: { type: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Fieldset>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const Required: Story = {
  args: {
    isRequired: true,
  },
}
