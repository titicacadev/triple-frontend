import { createContext, useContext } from 'react'

import { TabVariant } from './types'

export interface TabsContextValue<Value> {
  id: string
  value: Value
  variant: TabVariant
  scroll: boolean
  onChange?: (value: Value) => void
}

export const TabsContext = createContext<TabsContextValue<unknown> | undefined>(
  undefined,
)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('TabsContextContext가 없습니다.')
  }
  return context
}
