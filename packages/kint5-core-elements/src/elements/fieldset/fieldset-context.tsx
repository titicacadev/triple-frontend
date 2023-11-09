import { createContext } from 'react'

export interface FieldsetContextValue {
  isDisabled: boolean
  isRequired: boolean
}

export const FieldsetContext = createContext<FieldsetContextValue | undefined>(
  undefined,
)
