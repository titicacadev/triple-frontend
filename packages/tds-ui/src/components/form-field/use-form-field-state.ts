import { FocusEventHandler, useId, useState } from 'react'

export interface UseFormFieldStateParams {
  onBlur?: FocusEventHandler
  onFocus?: FocusEventHandler
}

export function useFormFieldState(params: UseFormFieldStateParams) {
  const inputId = useId()
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur: FocusEventHandler = (event) => {
    setIsFocused(false)
    params.onBlur?.(event)
  }

  const handleFocus: FocusEventHandler = (event) => {
    setIsFocused(true)
    params.onFocus?.(event)
  }

  return {
    inputId,
    labelId,
    descriptionId,
    errorId,
    isFocused,
    handleBlur,
    handleFocus,
  }
}
