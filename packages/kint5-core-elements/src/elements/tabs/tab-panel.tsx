import { PropsWithChildren, forwardRef } from 'react'

import { useTabs } from './tabs-context'

export interface TabPanelProps<Value> extends PropsWithChildren {
  /**
   * 각 탭마다의 유니크한 값
   */
  value: Value
  /**
   * 현재 탭이 아니라도 패널을 노출.
   */
  forceVisible?: boolean
}

export const TabPanel = forwardRef<
  HTMLDivElement,
  TabPanelProps<string | number | symbol>
>(function TabPanel({ children, value, forceVisible }, ref) {
  const tabs = useTabs<string | number | symbol>()

  return (
    <div
      ref={ref}
      id={`${tabs.id}-panel-${value.toString()}`}
      role="tabpanel"
      hidden={forceVisible ? false : tabs.value !== value}
      tabIndex={0}
      aria-labelledby={`${tabs.id}-tab-${value.toString()}`}
    >
      {children}
    </div>
  )
})
