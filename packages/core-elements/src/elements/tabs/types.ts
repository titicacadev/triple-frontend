interface Option {
  label: string
  value: any
}

export interface TabProps {
  value: any
  options: Option[]
  onChange: (e?: React.SyntheticEvent, value?: any) => any
  scroll?: boolean
}
