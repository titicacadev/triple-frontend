import { createContext, MutableRefObject, useContext } from 'react'

export interface PointingTabContextValue {
  tabsRef: MutableRefObject<Record<string, HTMLButtonElement | null>>
  left: number
  width: number
}

export const PointingTabContext = createContext<
  PointingTabContextValue | undefined
>(undefined)

export function usePointingTab() {
  const context = useContext(PointingTabContext)
  if (!context) {
    throw new Error('PointingTabContext가 없습니다.')
  }
  return context
}
