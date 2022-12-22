import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface FadeInOutProps {
  type: 'fadeInOut'
  options?: {
    infinity?: boolean
    repeatType?: 'loop' | 'reverse' | 'mirror'
  }
  children: ReactNode
}

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
    duration: 1,
    ...options,
  }

  return (
    <motion.div
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
