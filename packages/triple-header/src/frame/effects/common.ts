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
  initialOptions: T & InitialEffectOptions,
) {
  const { infinity, repeatType, ...options } = initialOptions

  const transition = {
    ...COMMON_TRANSITION,
    ...options,
    ...(infinity && { repeat: Infinity }),
    ...(repeatType && {
      repeatType,
    }),
  }

  return transition
}
