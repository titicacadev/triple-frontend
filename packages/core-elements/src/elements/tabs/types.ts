interface Option {
  label: string
  value: unknown
}

export interface TabProps {
  value: unknown
  options: Option[]
  onChange: (e?: React.SyntheticEvent, value?: unknown) => unknown
  scroll?: boolean
}
