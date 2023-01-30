import { DialogAria } from '@react-aria/dialog'
import { createContext, RefObject, useContext } from 'react'

export interface ActionSheetContextValue {
  ref: RefObject<HTMLDivElement>
  dialogProps: DialogAria['dialogProps']
  titleProps: DialogAria['titleProps']
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
