import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree: number
}

export interface FlyingProps {
  type: 'rotate'
  options?: ExtendedEffectOptions
}

export default function Flying({
  children,
  options: initialOptions,
}: PropsWithChildren<FlyingProps>) {
  const options = initialOptions
    ? {
        ...(initialOptions?.infinity && { repeat: Infinity }),
        ...(initialOptions?.repeatType && {
          repeatType: initialOptions.repeatType,
        }),
      }
    : {}

  const transition = {
    ease: 'linear',
    duration: 3,
    ...options,
  }

  return (
    <motion.div
      key={`flying_${stringifyTransition(transition)}`}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      initial={{ x: '150%', rotate: 0 }}
      animate={{ x: 0, rotate: initialOptions?.degree || 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
