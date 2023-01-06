import { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { InitialEffectOptions } from './types'

const variants = {
  enter: () => ({
    opacity: 0,
  }),
  active: () => ({
    opacity: 1,
  }),
  exit: () => ({
    opacity: 0,
  }),
}

export interface FadeInOutProps {
  type: 'fadeInOut'
  options?: InitialEffectOptions
  children: ReactNode
}

export default function FadeInOut({
  children,
  options: initialOptions,
}: FadeInOutProps) {
  const options = initialOptions
    ? {
        ...(initialOptions.infinity && { repeat: Infinity }),
        ...(initialOptions.repeatType && {
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
      key={`fade_in_out_${initialOptions?.infinity || ''}`}
      variants={variants}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      initial="enter"
      animate="active"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
