import { createContext, ElementType, useContext } from 'react'

export interface ActionSheetContextValue {
  open: boolean
  titleId: string
  onClose?: () => void
  customOverlay?: ElementType
}

export const ActionSheetContext = createContext<
  ActionSheetContextValue | undefined
>(undefined)

export function useActionSheet() {
  const context = useContext(ActionSheetContext)
  if (!context) {
    throw new Error()
  }
  return context
}
