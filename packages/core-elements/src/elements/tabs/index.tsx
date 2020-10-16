import React from 'react'

import BasicTab from './basic-tab'
import PointingTab from './pointing-tab'

type TabType = 'basic' | 'pointing'

const TAB_TYPE: { [key in TabType]: React.ElementType } = {
  basic: BasicTab,
  pointing: PointingTab,
}

type TabsProps =
  | ({ type: 'basic' } & Parameters<typeof BasicTab>[0])
  | ({ type: 'pointing' } & Parameters<typeof PointingTab>[0])
  | ({ type?: never } & Parameters<typeof PointingTab>[0])

export default function Tabs({ type = 'basic', ...props }: TabsProps) {
  const Component = TAB_TYPE[type]

  return <Component {...props} />
}
