import { createContext, useContext } from 'react'

export interface ActionSheetContextValue {
  open: boolean
  titleId: string
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
