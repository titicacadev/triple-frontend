import { ElementType } from 'react'

import { MarginPadding } from '../../commons'

import BasicTab from './basic-tab'
import PointingTab from './pointing-tab'
import { TabProps as TabPropsBase } from './types'

type TabType = 'basic' | 'pointing'

const TAB_TYPE: { [key in TabType]: ElementType } = {
  basic: BasicTab,
  pointing: PointingTab,
}

type TabsProps<Value> =
  | ({ type: 'basic' } & TabPropsBase<Value>)
  | ({ type?: 'pointing' } & TabPropsBase<Value> & {
        labelPadding?: MarginPadding
      })
  | ({ type?: never } & TabPropsBase<Value> & {
        labelPadding?: MarginPadding
      })

export default function Tabs<Value>({
  type = 'basic',
  ...props
}: TabsProps<Value>) {
  const Component = TAB_TYPE[type]

  return <Component {...props} />
}
