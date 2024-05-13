import { MarginPadding } from '@titicaca/tds-ui'
import { SyntheticEvent } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'

import { ImageFrame } from './frame/image'
import { TextFrame } from './frame/text'

export interface TripleHeaderProps {
  type: HeaderType
  framer?: {
    canvas: Canvas
    layers: Layer[]
  }
  lottie?: {
    backgroundImage?: ImageMeta
    lottieAnimationId?: string
  }
}

export type HeaderType = 'FRAMER' | 'LOTTIE'

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

export interface Link {
  href: string
  label?: string
  target?: 'browser'
}

export type LinkEventHandler = (e: SyntheticEvent, link: Link) => void
