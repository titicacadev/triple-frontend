import React, { PropsWithChildren } from 'react'

import { useTabs } from './tabs-context'

export interface TabPanelProps extends PropsWithChildren {
  value: string
}

export const TabPanel = ({ children, value }: TabPanelProps) => {
  const tabs = useTabs()

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
