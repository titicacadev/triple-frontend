import CSS from 'csstype'

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.MarginProperty<string | number>
  >
>

export type Styles = {
  margin?: MarginPadding
  padding?: MarginPadding
  ellipsis?: boolean
}
