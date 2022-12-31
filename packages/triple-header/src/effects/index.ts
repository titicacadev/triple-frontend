import None from './none'
import FadeInOut, { FadeInOutProps } from './fadeInOut'
import Rotate, { RotateProps } from './rotate'
import Flying, { FlyingProps } from './flying'

export const IMAGE_EFFECTS = {
  none: None,
  fadeInOut: FadeInOut,
  rotate: Rotate,
  flying: Flying,
}

export type EffectData = FadeInOutProps | RotateProps | FlyingProps
