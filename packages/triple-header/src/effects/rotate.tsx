import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export interface RotateProps {
  type: 'rotate'
  options: ExtendedEffectOptions
}

export default function Rotate({
  children,
  options = {},
}: PropsWithChildren<RotateProps>) {
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
      key={`rotate_${stringifyTransition(transition)}`}
      animate={{ rotate: options.degree || 0 }}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
