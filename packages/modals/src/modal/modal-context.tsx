import { DialogAria } from '@react-aria/dialog'
import { createContext, RefObject, useContext } from 'react'

export interface ModalContextValue {
  ref: RefObject<HTMLDivElement>
  dialogProps: DialogAria['dialogProps']
  titleProps: DialogAria['titleProps']
  open: boolean
  descriptionId: string
  onClose?: () => void
}

export const ModalContext =
  createContext<ModalContextValue | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error()
  }
  return context
}
