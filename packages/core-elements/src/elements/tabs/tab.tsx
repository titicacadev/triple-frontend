import { BasicTab } from './basic-tab'
import { PointingTab } from './pointing-tab'
import { RoundedTab } from './rounded-tab'
import { TabBaseProps } from './tab-base'
import { useTabs } from './tabs-context'

export type TabProps = TabBaseProps

export const Tab = (props: TabBaseProps) => {
  const tabs = useTabs()

  switch (tabs.variant) {
    case 'basic':
      return <BasicTab {...props} />
    case 'pointing':
      return <PointingTab {...props} />
    case 'rounded':
      return <RoundedTab {...props} />
  }
}
