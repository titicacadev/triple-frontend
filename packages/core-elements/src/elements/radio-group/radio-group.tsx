import { FocusEventHandler, HTMLAttributes, useId, useState } from 'react'

import { RadioGroupContext } from './radio-group-context'
import { RadioGroupLabel } from './radio-group-label'
import { RadioGroupError } from './radio-group-error'
import { RadioGroupHelp } from './radio-group-help'

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  name?: string
  value?: string
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string
  help?: string
  onBlur?: FocusEventHandler
  onChange?: (value: string) => void
  onFocus?: FocusEventHandler
}

export const RadioGroup = ({
  children,
  name,
  value,
  disabled = false,
  required = false,
  label,
  error,
  help,
  onBlur,
  onChange,
  onFocus,
  ...props
}: RadioGroupProps) => {
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
    <RadioGroupContext.Provider
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
        role="radiogroup"
        aria-describedby={descriptionId}
        aria-errormessage={errorId}
        aria-invalid={isError}
        aria-required={required}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      >
        {label ? <RadioGroupLabel>{label}</RadioGroupLabel> : null}
        <div>{children}</div>
        {error ? (
          <RadioGroupError>{error}</RadioGroupError>
        ) : help ? (
          <RadioGroupHelp>{help}</RadioGroupHelp>
        ) : null}
      </fieldset>
    </RadioGroupContext.Provider>
  )
}
