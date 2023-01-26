import { MarginPadding } from '@titicaca/core-elements'

import { ImageFrame } from './frame/image'
import { TextFrame } from './frame/text'

export interface TripleHeader {
  canvas: Canvas
  layers: Layer[]
}

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

export type TransitionType = 'slide' | 'rolling' | 'marquee' | 'fadeInOut'

export type FrameData = ImageFrame | TextFrame
