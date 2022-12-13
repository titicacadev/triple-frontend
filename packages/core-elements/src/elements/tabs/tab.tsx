import { BasicTab } from './basic-tab'
import { PointingTab } from './pointing-tab'
import { RoundedTab } from './rounded-tab'
import { TabBaseProps } from './tab-base'
import { useTabs } from './tabs-context'

export type TabProps<Value> = TabBaseProps<Value>

export const Tab = <Value extends number | string | symbol>(
  props: TabProps<Value>,
) => {
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
