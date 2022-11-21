import { BasicTabList } from './basic-tab-list'
import { PointingTabList } from './pointing-tab-list'
import { RoundedTabList } from './rounded-tab-list'
import { TabListBaseProps } from './tab-list-base'
import { useTabs } from './tabs-context'

export type TabListProps = TabListBaseProps

export const TabList = (props: TabListProps) => {
  const tabs = useTabs()

  switch (tabs.variant) {
    case 'basic':
      return <BasicTabList {...props} />
    case 'pointing':
      return <PointingTabList {...props} />
    case 'rounded':
      return <RoundedTabList {...props} />
  }
}
