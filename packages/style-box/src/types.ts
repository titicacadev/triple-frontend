import CSS from 'csstype'

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.MarginProperty<string | number>
  >
>

export type Ellipsis = boolean
export type Width = number
export type Height = number
export type Clearing = boolean
export type BorderRadius = number
export interface Position {
  type: CSS.PositionProperty
  top?: number
  right?: number
  bottom?: number
  left?: number
}
