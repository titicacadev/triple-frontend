import type { Meta } from '@storybook/react'

import { FormField } from './form-field'
import { useFormField } from './form-field-context'
import { FormFieldError } from './form-field-error'
import { FormFieldHelp } from './form-field-help'
import { FormFieldLabel } from './form-field-label'

export default {
  title: 'tds-ui / FormField',
  component: FormField,
} as Meta<typeof FormField>

const CustomInput = () => {
  const {
    inputId,
    descriptionId,
    errorId,
    handleBlur,
    handleFocus,
    isDisabled,
    isError,
    isRequired,
  } = useFormField()

  return (
    <input
      id={inputId}
      disabled={isDisabled}
      required={isRequired}
      aria-invalid={isError}
      aria-describedby={descriptionId}
      aria-errormessage={errorId}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
}

export const Default = () => {
  return (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <CustomInput />
      <FormFieldHelp>Helper text.</FormFieldHelp>
    </FormField>
  )
}

export const Required = () => {
  return (
    <FormField isRequired>
      <FormFieldLabel>Label</FormFieldLabel>
      <CustomInput />
      <FormFieldHelp>Helper text.</FormFieldHelp>
    </FormField>
  )
}

export const Error = () => {
  return (
    <FormField isError>
      <FormFieldLabel>Label</FormFieldLabel>
      <CustomInput />
      <FormFieldError>Error message.</FormFieldError>
    </FormField>
  )
}
