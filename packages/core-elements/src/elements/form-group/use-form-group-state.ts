import { FocusEventHandler, useId, useState } from 'react'

export interface UseFormGroupStateParams {
  onBlur?: FocusEventHandler
  onFocus?: FocusEventHandler
}

export function useFormGroupState(params: UseFormGroupStateParams) {
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
    descriptionId,
    errorId,
    isFocused,
    handleBlur,
    handleFocus,
  }
}
