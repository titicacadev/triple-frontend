import { MarginPadding } from '@titicaca/core-elements'

import { TextFrame } from './frames/text'
import { ImageFrame } from './frames/image'

export interface TripleHeader {
  canvas: Canvas
  layers: Layer[]
}

interface Canvas {
  width: number
  height: number
}

interface Layer {
  id: number
  opacity?: number
  frames: FrameData[]
  transition: {
    type: 'slide' | 'rolling' | 'marquee'
    duration?: number
  }
  display?: string
  positioning?: MarginPadding
}

export type FrameData = ImageFrame | TextFrame

type FrameType = FrameData['type']

export type GetValue<Key extends FrameType> = Extract<
  FrameData,
  { type: Key }
>['value']
