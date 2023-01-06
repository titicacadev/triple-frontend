import None from './none'
import Zoom, { ZoomProps } from './zoom'
import Rotate, { RotateProps } from './rotate'
import Flying, { FlyingProps } from './flying'

export const EFFECTES = {
  none: None,
  zoom: Zoom,
  rotate: Rotate,
  flying: Flying,
}

export type EffectData = ZoomProps | RotateProps | FlyingProps
