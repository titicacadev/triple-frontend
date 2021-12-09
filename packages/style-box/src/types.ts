import * as CSS from 'csstype'

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.Property.Margin<string | number>
  >
>

export type Ellipsis = boolean
export type Width = number
export type Height = number
export type Clearing = boolean
export type BorderRadius = number
export type Centered = boolean
export type HorizontalScroll = boolean
export type BoxSizing = CSS.Property.BoxSizing
export type Clear = CSS.Property.Clear
export type Display = CSS.Property.Display
export type Float = CSS.Property.Float
export type TextAlign = CSS.Property.TextAlign
export type UserSelect = CSS.Property.UserSelect
export type Overflow = CSS.Property.Overflow
export type WhiteSpace = CSS.Property.WhiteSpace
export type Position = BasePosition | RichPosition
export type BasePosition = CSS.Property.Position
export interface RichPosition {
  type: CSS.Property.Position
  top?: number
  right?: number
  bottom?: number
  left?: number
}
