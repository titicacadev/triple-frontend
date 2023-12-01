import { Transition } from 'framer-motion'

import { InitialEffectOptions } from './types'

export function stringifyTransition(transition: Transition) {
  return Object.entries(transition)
    .map(([key, value]) => `${key}_${value}`)
    .join(',')
}

const COMMON_TRANSITION = {
  ease: 'linear',
  duration: 3,
}

export function generateTransition<T>(
  initialOptions: T & InitialEffectOptions & { duration?: number },
  index: number,
  frameCount: number,
) {
  const {
    infinity,
    repeatType,
    duration = COMMON_TRANSITION.duration,
    ...options
  } = initialOptions

  const transition = {
    ...COMMON_TRANSITION,
    duration,
    ...options,
    ...(infinity && { repeat: Infinity }),
    ...(repeatType && {
      repeatType,
    }),
    ...(index && { delay: COMMON_TRANSITION.duration * index }),
    ...(frameCount && {
      repeatDelay: COMMON_TRANSITION.duration * frameCount - duration,
    }),
  }

  return transition
}
