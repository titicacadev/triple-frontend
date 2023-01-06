import None from './none'
import Zoom, { ZoomProps } from './zoom'
import FadeInOut, { FadeInOutProps } from './fadeInOut'
import Rotate, { RotateProps } from './rotate'
import Flying, { FlyingProps } from './flying'

export const EFFECTES = {
  none: None,
  zoom: Zoom,
  fadeInOut: FadeInOut,
  rotate: Rotate,
  flying: Flying,
}

export type EffectData = ZoomProps | FadeInOutProps | RotateProps | FlyingProps
