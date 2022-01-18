import * as CSS from 'csstype'

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.Property.Margin<string | number>
  >
>

/**
 * @deprecated type-definitions로 이동합니다.
 */
export type BaseSizes = 'small' | 'medium' | 'large'

/**
 * @deprecated type-definitions로 이동합니다.
 */
export type GlobalSizes =
  | 'mini'
  | 'tiny'
  | 'big'
  | 'huge'
  | 'massive'
  | BaseSizes

/* eslint-disable @typescript-eslint/naming-convention */
enum GlobalColorSet {
  blue = '54, 143, 255',
  gray = '58, 58, 58',
  white = '255, 255, 255',
  red = '255, 33, 60',
}
/* eslint-enable @typescript-eslint/naming-convention */

export type GlobalColors = 'blue' | 'gray' | 'white' | 'red'

export function GetGlobalColor(colorString: GlobalColors | string) {
  return GlobalColorSet[colorString as GlobalColors] || colorString // HACK: GlobalColors가 아닌 경우 colorString을 그대로 반환하게 되므로 에러 없음
}

/**
 * @deprecated type-definitions로 이동합니다.
 */
export type Ratio =
  | '4:1'
  | '5:3'
  | '11:7'
  | '4:3'
  | '1:1'
  | '10:11'
  | '5:8'
  | '9:5'

/**
 * @deprecated type-definitions로 이동합니다.
 */
export type FrameRatioAndSizes =
  | Exclude<GlobalSizes, 'tiny' | 'massive'>
  | 'original'
  | Ratio

const ratio = {
  '4:1': '25%',
  '9:5': '55.56%',
  '5:3': '60%',
  '11:7': '63.64%',
  '4:3': '75%',
  '1:1': '100%',
  '10:11': '110%',
  '5:8': '160%',
}

export const MEDIA_FRAME_OPTIONS: {
  [key in FrameRatioAndSizes]: string | undefined
} = {
  mini: ratio['4:1'],
  small: ratio['5:3'],
  medium: ratio['4:3'],
  large: ratio['1:1'],
  big: ratio['10:11'],
  huge: ratio['5:8'],
  original: undefined,
  ...ratio,
}

export type CarouselSizes = Exclude<
  GlobalSizes,
  'mini' | 'tiny' | 'huge' | 'massive'
>
