import { PropsWithChildren, useId } from 'react'

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
