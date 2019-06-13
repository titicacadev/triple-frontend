import * as CSS from 'csstype'

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.MarginProperty<string | number>
  >
>

export type GlobalSizes =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive'

enum GlobalColorSet {
  blue = '41, 135, 240',
  gray = '58, 58, 58',
  white = '255, 255, 255',
  red = '255, 33, 60',
  black = '245, 245, 245',
  pink = '253, 46, 105',
  orange = '255, 91, 47',
}

export type GlobalColors =
  | 'blue'
  | 'gray'
  | 'white'
  | 'red'
  | 'black'
  | 'pink'
  | 'orange'
  | 'purple'

export function SetGlobalColor(colorString: string) {
  return GlobalColorSet[colorString] || colorString
}
