import React from 'react'

import BasicTab from './basic-tab'
import PointingTab from './pointing-tab'
import { TabProps } from './types'

type TabType = 'basic' | 'pointing'

const TAB_TYPE: { [key in TabType]: React.ElementType } = {
  basic: BasicTab,
  pointing: PointingTab,
}

export default function Tabs({
  value: currentValue,
  options,
  onChange,
  type = 'basic',
  scroll,
}: TabProps & { type: TabType }) {
  const Component = TAB_TYPE[type]

  return (
    <Component
      scroll={scroll}
      onChange={onChange}
      options={options}
      value={currentValue}
    />
  )
}
