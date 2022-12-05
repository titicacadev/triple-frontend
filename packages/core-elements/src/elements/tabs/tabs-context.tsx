import { createContext, useContext } from 'react'
import once from 'lodash.once'

import { TabVariant } from './types'

export interface TabsContextValue<Value> {
  id: string
  value: Value
  variant: TabVariant
  scroll: boolean
  onChange?: (value: Value) => void
}

export const createTabsContext = once(<Value,>() =>
  createContext<TabsContextValue<Value> | undefined>(undefined),
)

export function useTabs<Value>() {
  const context = useContext(createTabsContext<Value>())
  if (!context) {
    throw new Error('TabsContextContext가 없습니다.')
  }
  return context
}
