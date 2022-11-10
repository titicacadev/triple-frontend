import { ElementType } from 'react'

import { MarginPadding } from '../../commons'

import BasicTab from './basic-tab'
import PointingTab from './pointing-tab'
import RoundedTab from './rounded-tab'
import { TabProps as TabPropsBase } from './types'

type TabType = 'basic' | 'pointing' | 'rounded'

const TAB_TYPE: { [key in TabType]: ElementType } = {
  basic: BasicTab,
  pointing: PointingTab,
  rounded: RoundedTab,
}

type TabsProps<Value> =
  | ({ type: 'basic' } & TabPropsBase<Value>)
  | ({ type?: 'pointing' } & TabPropsBase<Value> & {
        labelPadding?: MarginPadding
      })
  | ({ type?: 'rounded' } & TabPropsBase<Value> & {
        containerPadding?: MarginPadding
      })
  | ({ type?: never } & TabPropsBase<Value> & {
        labelPadding?: MarginPadding
      })

export function Tabs<Value>({ type = 'basic', ...props }: TabsProps<Value>) {
  const Component = TAB_TYPE[type]

  return <Component {...props} />
}
