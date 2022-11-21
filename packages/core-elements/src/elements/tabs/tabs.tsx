import { PropsWithChildren, useId } from 'react'

import { Tab } from './tab'
import { TabList } from './tab-list'
import { TabPanel } from './tab-panel'
import { TabsContext } from './tabs-context'
import { TabVariant } from './types'

export interface TabsProps extends PropsWithChildren {
  value: string
  variant?: TabVariant
  scroll?: boolean
  onChange?: (value: string) => void
}

export const Tabs = ({
  children,
  value,
  variant = 'basic',
  scroll = false,
  onChange,
}: TabsProps) => {
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
