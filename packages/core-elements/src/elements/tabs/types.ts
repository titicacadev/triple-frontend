import { SyntheticEvent } from 'react'

interface Option<Value> {
  label: string
  value: Value
}

export interface TabProps<Value> {
  value: Value
  options: Option<Value>[]
  onChange: (e?: SyntheticEvent, value?: Value) => unknown
  scroll?: boolean
}
