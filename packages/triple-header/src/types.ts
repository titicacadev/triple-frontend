import { MarginPadding } from '@titicaca/core-elements'

import { TextFrame } from './frames/text'
import { ImageFrame } from './frames/image'

type TransitionType = 'slide' | 'rolling' | 'marquee'

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

interface Layer {
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
