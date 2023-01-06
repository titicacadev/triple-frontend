import { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { InitialEffectOptions } from './types'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree: number
}

export interface FlyingProps {
  type: 'rotate'
  options?: ExtendedEffectOptions
  children: ReactNode
}

export default function Flying({
  children,
  options: initialOptions,
}: FlyingProps) {
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
      key={`flying_${initialOptions?.infinity || ''}`}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      initial={{ x: '150%', rotate: 0 }}
      animate={{ x: 0, rotate: initialOptions?.degree || 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
