import { PropsWithChildren } from 'react'

import { FieldsetContext } from './fieldset-context'

export interface FieldsetProps extends PropsWithChildren {
  isDisabled?: boolean
  isRequired?: boolean
}

export const Fieldset = ({
  children,
  isDisabled = false,
  isRequired = false,
}: FieldsetProps) => {
  return (
    <FieldsetContext.Provider
      value={{
        isDisabled,
        isRequired,
      }}
    >
      <fieldset disabled={isDisabled}>{children}</fieldset>
    </FieldsetContext.Provider>
  )
}
