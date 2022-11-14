import { useId } from 'react'

export function useFormFieldState() {
  const inputId = useId()
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()

  return {
    inputId,
    labelId,
    descriptionId,
    errorId,
  }
}
