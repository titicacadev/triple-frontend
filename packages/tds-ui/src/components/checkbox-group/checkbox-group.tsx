import { FocusEventHandler, HTMLAttributes, useId, useState } from 'react'

import { CheckboxGroupContext } from './checkbox-group-context'
import { CheckboxGroupLabel } from './checkbox-group-label'
import { CheckboxGroupError } from './checkbox-group-error'
import { CheckboxGroupHelp } from './checkbox-group-help'

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  name?: string
  value?: string[]
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string
  help?: string
  onBlur?: FocusEventHandler
  onChange?: (value: string[]) => void
  onFocus?: FocusEventHandler
}

export const CheckboxGroup = ({
  children,
  name,
  value = [],
  disabled = false,
  required = false,
  label,
  error,
  help,
  onBlur,
  onChange,
  onFocus,
  ...props
}: CheckboxGroupProps) => {
  const descriptionId = useId()
  const errorId = useId()
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur: FocusEventHandler = (event) => {
    setIsFocused(false)
    onBlur?.(event)
  }

  const handleFocus: FocusEventHandler = (event) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const isError = !!error

  return (
    <CheckboxGroupContext.Provider
      value={{
        descriptionId,
        errorId,
        isDisabled: disabled,
        isError,
        isFocused,
        isRequired: required,
        name,
        value,
        onChange,
      }}
    >
      <fieldset
        aria-describedby={descriptionId}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      >
        {label ? <CheckboxGroupLabel>{label}</CheckboxGroupLabel> : null}
        <div>{children}</div>
        {error ? (
          <CheckboxGroupError>{error}</CheckboxGroupError>
        ) : help ? (
          <CheckboxGroupHelp>{help}</CheckboxGroupHelp>
        ) : null}
      </fieldset>
    </CheckboxGroupContext.Provider>
  )
}
