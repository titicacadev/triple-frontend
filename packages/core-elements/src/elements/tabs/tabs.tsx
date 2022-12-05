import { PropsWithChildren, useId } from 'react'

import { Tab } from './tab'
import { TabList } from './tab-list'
import { TabPanel } from './tab-panel'
import { TabsContext } from './tabs-context'
import { TabVariant } from './types'

export interface TabsProps<Value> extends PropsWithChildren {
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

export const Tabs = <Value,>({
  children,
  value,
  variant = 'basic',
  scroll = false,
  onChange,
}: TabsProps<Value>) => {
  const id = useId()

  return (
    <TabsContext.Provider value={{ id, value, variant, scroll, onChange }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanel = TabPanel
