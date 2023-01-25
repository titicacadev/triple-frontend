import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export interface FlyingProps {
  type: 'rotate'
  options?: ExtendedEffectOptions
}

export default function Flying({
  children,
  options = {},
}: PropsWithChildren<FlyingProps>) {
  const transition = {
    ease: 'linear',
    duration: 3,
    ...(options.infinity && { repeat: Infinity }),
    ...(options.repeatType && {
      repeatType: options.repeatType,
    }),
  }

  return (
    <motion.div
      key={`flying_${stringifyTransition(transition)}`}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      initial={{ x: '150%', rotate: 0 }}
      animate={{ x: 0, rotate: options.degree || 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
