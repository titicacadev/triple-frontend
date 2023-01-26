import None from './none'
import Zoom, { ZoomEffect } from './zoom'
import Rotate, { RotateEffect } from './rotate'
import Flying, { FlyingEffect } from './flying'

export const EFFECTES = {
  none: None,
  zoom: Zoom,
  rotate: Rotate,
  flying: Flying,
}

export type Effect = ZoomEffect | RotateEffect | FlyingEffect
