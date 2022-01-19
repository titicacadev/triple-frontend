interface Option<Value> {
  label: string
  value: Value
}

export interface TabProps<Value> {
  value: Value
  options: Option<Value>[]
  onChange: (e?: React.SyntheticEvent, value?: Value) => unknown
  scroll?: boolean
}
