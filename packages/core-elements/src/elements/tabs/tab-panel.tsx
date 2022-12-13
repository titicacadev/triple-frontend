import React, { PropsWithChildren } from 'react'

import { useTabs } from './tabs-context'

export interface TabPanelProps<Value> extends PropsWithChildren {
  /**
   * 각 탭마다의 유니크한 값
   */
  value: Value
}

export const TabPanel = <Value extends number | string | symbol>({
  children,
  value,
}: TabPanelProps<Value>) => {
  const tabs = useTabs<Value>()

  return (
    <div
      id={`${tabs.id}-panel-${value}`}
      role="tabpanel"
      hidden={tabs.value !== value}
      tabIndex={0}
      aria-labelledby={`${tabs.id}-tab-${value}`}
    >
      {children}
    </div>
  )
}
