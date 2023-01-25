import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

export interface ZoomProps {
  type: 'zoom'
  options?: InitialEffectOptions
}

export default function Zoom({
  children,
  options = {},
}: PropsWithChildren<ZoomProps>) {
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
      key={`zoom_${stringifyTransition(transition)}`}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      animate={{ scale: 1.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
