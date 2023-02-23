import { createContext, useContext } from 'react'
import { TransitionStatus } from 'react-transition-group'

export interface ActionSheetContextValue {
  transitionStatus: TransitionStatus
  open: boolean
  onClose?: () => void
}

export const ActionSheetContext =
  createContext<ActionSheetContextValue | undefined>(undefined)

export function useActionSheet() {
  const context = useContext(ActionSheetContext)
  if (!context) {
    throw new Error()
  }
  return context
}
