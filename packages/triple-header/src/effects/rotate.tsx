import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

import { InitialEffectOptions } from './types'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree: number
}

export interface RotateProps {
  type: 'rotate'
  options?: ExtendedEffectOptions
}

export default function Rotate({
  children,
  options: initialOptions,
}: PropsWithChildren<RotateProps>) {
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
      animate={{ rotate: initialOptions?.degree || 0 }}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
