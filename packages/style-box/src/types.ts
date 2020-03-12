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
export type Centered = boolean
export type HorizontalScroll = boolean
export type BoxSizing = CSS.BoxSizingProperty
export type Clear = CSS.ClearProperty
export type Display = CSS.DisplayProperty
export type Float = CSS.FloatProperty
export type TextAlign = CSS.TextAlignProperty
export type UserSelect = CSS.UserSelectProperty
export type Overflow = CSS.OverflowProperty
export type WhiteSpace = CSS.WhiteSpaceProperty
export type Position = BasePosition | RichPosition
export type BasePosition = CSS.PositionProperty
export type RichPosition = {
  type: CSS.PositionProperty
  top?: number
  right?: number
  bottom?: number
  left?: number
}
