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
  blue = '54, 143, 255',
  gray = '58, 58, 58',
  white = '255, 255, 255',
  red = '255, 33, 60',
}

export type GlobalColors = 'blue' | 'gray' | 'white' | 'red'

export function GetGlobalColor(colorString: GlobalColors | string) {
  return GlobalColorSet[colorString as GlobalColors] || colorString // HACK: GlobalColors가 아닌 경우 colorString을 그대로 반환하게 되므로 에러 없음
}
export type Ratio = '4:1' | '5:3' | '11:7' | '4:3' | '1:1' | '10:11' | '5:8'

export type FrameRatioAndSizes =
  | Exclude<GlobalSizes, 'tiny' | 'massive'>
  | Ratio

const ratio = ['25%', '60%', '63.64%', '75%', '100%', '110%', '160%']

export const MEDIA_FRAME_OPTIONS: {
  [key in FrameRatioAndSizes]: string
} = {
  mini: ratio[0],
  small: ratio[1],
  medium: ratio[3],
  large: ratio[4],
  big: ratio[5],
  huge: ratio[6],
  '4:1': ratio[0],
  '5:3': ratio[1],
  '11:7': ratio[2],
  '4:3': ratio[3],
  '1:1': ratio[4],
  '10:11': ratio[5],
  '5:8': ratio[6],
}

export type CarouselSizes = Exclude<
  GlobalSizes,
  'mini' | 'tiny' | 'huge' | 'massive'
>
