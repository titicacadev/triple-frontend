import { Zoom, ZoomEffect } from './zoom'
import { Rotate, RotateEffect } from './rotate'
import { Flying, FlyingEffect } from './flying'

export const EFFECTS = {
  zoom: Zoom,
  rotate: Rotate,
  flying: Flying,
}

export type Effect = ZoomEffect | RotateEffect | FlyingEffect
