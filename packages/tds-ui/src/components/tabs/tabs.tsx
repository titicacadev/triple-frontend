import { PropsWithChildren, Provider, useId } from 'react'

import { TabsContext, TabsContextValue } from './tabs-context'
import { TabVariant } from './types'

export interface TabsProps<Value extends number | string | symbol>
  extends PropsWithChildren {
  /**
   * 현재 탭을 가르키는 값
   */
  value: Value
  /**
   * 디자인 variant
   */
  variant?: TabVariant
  /**
   * 스크롤 가능한 탭 사용 여부. `pointing` 또는 `rounded` variant 일 때만 사용 가능
   */
  scroll?: boolean
  /**
   * 탭 변경 이벤트 핸들러
   */
  onChange?: (value: Value) => void
}

export const Tabs = <Value extends number | string | symbol>({
  children,
  value,
  variant = 'basic',
  scroll = false,
  onChange,
}: TabsProps<Value>) => {
  const id = useId()
  const TabsContextProvider = TabsContext.Provider as Provider<
    TabsContextValue<Value> | undefined
  >

  function handleFocusChanged(newValue: Value) {
    if (value !== newValue) {
      onChange?.(newValue)
    }
  }

  return (
    <TabsContextProvider
      value={{ id, value, variant, scroll, handleFocusChanged }}
    >
      {children}
    </TabsContextProvider>
  )
}
