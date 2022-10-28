import { createContext, useContext } from 'react'

export interface ModalContextValue {
  open: boolean
  titleId: string
  descriptionId: string
  onClose?: () => void
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error()
  }
  return context
}
