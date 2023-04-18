import { PropsWithChildren } from 'react'

import {
  UseFormGroupStateParams,
  useFormGroupState,
} from './use-form-group-state'
import { FormGroupContext } from './form-group-context'

export interface FormGroupProps
  extends UseFormGroupStateParams,
    PropsWithChildren {
  isError?: boolean
  isDisabled?: boolean
  isRequired?: boolean
}

export const FormGroup = ({
  children,
  isError = false,
  isDisabled = false,
  isRequired = false,
  onBlur,
  onFocus,
}: FormGroupProps) => {
  const state = useFormGroupState({ onBlur, onFocus })

  return (
    <FormGroupContext.Provider
      value={{
        ...state,
        isError,
        isDisabled,
        isRequired,
      }}
    >
      {children}
    </FormGroupContext.Provider>
  )
}
