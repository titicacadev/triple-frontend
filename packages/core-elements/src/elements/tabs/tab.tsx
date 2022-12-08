import { BasicTab } from './basic-tab'
import { PointingTab } from './pointing-tab'
import { RoundedTab } from './rounded-tab'
import { TabBaseProps } from './tab-base'
import { useTabs } from './tabs-context'

export type TabProps = TabBaseProps

export const Tab = <Value,>(props: TabBaseProps) => {
  const tabs = useTabs<Value>()

  switch (tabs.variant) {
    case 'basic':
      return <BasicTab {...props} />
    case 'pointing':
      return <PointingTab<Value> {...props} />
    case 'rounded':
      return <RoundedTab {...props} />
  }
}
