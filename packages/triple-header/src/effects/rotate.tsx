import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface RotateProps {
  type: 'rotate'
  options?: {
    degree: number
    infinity?: boolean
    repeatType?: 'loop' | 'reverse' | 'mirror'
  }
  children: ReactNode
}

export default function Rotate({
  children,
  options: initialOptions,
}: RotateProps) {
  const options = initialOptions
    ? {
        degree: initialOptions.degree,
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
      animate={{ rotate: initialOptions?.degree || 0 }}
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
