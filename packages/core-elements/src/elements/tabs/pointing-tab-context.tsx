import { createContext, MutableRefObject, useContext } from 'react'

export interface PointingTabContextValue<
  Value extends number | string | symbol,
> {
  tabsRef: MutableRefObject<Record<Value, HTMLButtonElement | null>>
  left: number
  width: number
}

export const PointingTabContext =
  createContext<PointingTabContextValue<string> | undefined>(undefined)

export function usePointingTab<Value extends number | string | symbol>() {
  const context = useContext(PointingTabContext) as
    | PointingTabContextValue<Value>
    | undefined
  if (!context) {
    throw new Error('PointingTabContext가 없습니다.')
  }
  return context
}
