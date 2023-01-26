import { MarginPadding } from '@titicaca/core-elements'

import { TextFrame } from './frame/text'
import { ImageFrame } from './frame/image'

export type TransitionType = 'slide' | 'rolling' | 'marquee' | 'fadeInOut'

export type FrameData = ImageFrame | TextFrame

type FrameType = FrameData['type']

export type GetValue<Key extends FrameType> = Extract<
  FrameData,
  { type: Key }
>['value']

interface Canvas {
  width: number
  height: number
}

export interface Layer {
  frames: FrameData[]
  transition?: {
    type: TransitionType
  }
  positioning?: MarginPadding
}

export interface TripleHeader {
  canvas: Canvas
  layers: Layer[]
}
