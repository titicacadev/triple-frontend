import * as CSS from 'csstype'

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.Property.Margin<string | number>
  >
>

export type BaseSizes = 'small' | 'medium' | 'large'

export type GlobalSizes =
  | 'mini'
  | 'tiny'
  | 'big'
  | 'huge'
  | 'massive'
  | BaseSizes

export type Ratio =
  | '4:1'
  | '5:3'
  | '11:7'
  | '4:3'
  | '1:1'
  | '10:11'
  | '5:8'
  | '9:5'

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
