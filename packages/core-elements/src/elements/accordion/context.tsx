import { createContext, useContext } from 'react'

interface ContextValue {
  contentId: string
  foldedId: string
  active: boolean
  onActiveChange: () => void
}

export const AccordionContext =
  createContext<ContextValue | undefined>(undefined)

export function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error()
  }
  return context
}
