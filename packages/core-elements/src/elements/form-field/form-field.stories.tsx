import { ComponentMeta } from '@storybook/react'

import { FormField } from './form-field'

export default {
  title: 'core-elements / FormField',
  component: FormField,
} as ComponentMeta<typeof FormField>

export const Default = () => {
  return <FormField />
}
