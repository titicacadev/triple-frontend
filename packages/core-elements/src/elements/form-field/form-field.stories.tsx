import { ComponentMeta } from '@storybook/react'

import { FormField } from './form-field'
import { FormFieldContext } from './form-field-context'
import { FormFieldError } from './form-field-error'
import { FormFieldHelp } from './form-field-help'
import { FormFieldLabel } from './form-field-label'

export default {
  title: 'core-elements / FormField',
  component: FormField,
} as ComponentMeta<typeof FormField>

export const Default = () => {
  return (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldContext.Consumer>
        {(formField) => (
          <input
            id={formField?.inputId}
            aria-labelledby={formField?.labelId}
            aria-describedby={formField?.descriptionId}
          />
        )}
      </FormFieldContext.Consumer>
      <FormFieldHelp>Helper text.</FormFieldHelp>
    </FormField>
  )
}

export const Required = () => {
  return (
    <FormField isRequired>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldContext.Consumer>
        {(formField) => (
          <input
            id={formField?.inputId}
            aria-labelledby={formField?.labelId}
            aria-describedby={formField?.descriptionId}
            required
          />
        )}
      </FormFieldContext.Consumer>
      <FormFieldHelp>Helper text.</FormFieldHelp>
    </FormField>
  )
}

export const Error = () => {
  return (
    <FormField isError>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldContext.Consumer>
        {(formField) => (
          <input
            id={formField?.inputId}
            aria-labelledby={formField?.labelId}
            aria-errormessage={formField?.errorId}
            aria-invalid
          />
        )}
      </FormFieldContext.Consumer>
      <FormFieldError>Error message.</FormFieldError>
    </FormField>
  )
}
