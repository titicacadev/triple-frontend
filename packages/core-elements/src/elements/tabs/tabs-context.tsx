import { createContext, useContext } from 'react'

import { TabVariant } from './types'

export interface TabsContextValue {
  id: string
  value: string
  variant: TabVariant
  scroll: boolean
  onChange?: (value: string) => void
}

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('TabsContextContext가 없습니다.')
  }
  return context
}
