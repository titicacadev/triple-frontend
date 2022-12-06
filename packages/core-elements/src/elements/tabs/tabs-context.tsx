import { createContext, useContext } from 'react'

import { TabVariant } from './types'

export interface TabsContextValue<Value = unknown> {
  id: string
  value: Value
  variant: TabVariant
  scroll: boolean
  onChange?: (value: Value) => void
}

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
)

export function useTabs<Value>() {
  const context = useContext(TabsContext) as TabsContextValue<Value> | undefined
  if (!context) {
    throw new Error('TabsContextContext가 없습니다.')
  }
  return context
}
