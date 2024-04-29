import { ForwardedRef, forwardRef } from 'react'

import { BasicTab } from './basic-tab'
import { PointingTab } from './pointing-tab'
import { RoundedTab } from './rounded-tab'
import { TabBaseProps } from './tab-base'
import { useTabs } from './tabs-context'

export type TabProps<Value> = TabBaseProps<Value>

function TabImpl<Value extends number | string | symbol>(
  props: TabProps<Value>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const tabs = useTabs<Value>()

  switch (tabs.variant) {
    case 'basic':
      return <BasicTab ref={ref} {...props} />
    case 'pointing':
      return <PointingTab<Value> {...props} />
    case 'rounded':
      return <RoundedTab ref={ref} {...props} />
  }
}

export const Tab = forwardRef(TabImpl)
