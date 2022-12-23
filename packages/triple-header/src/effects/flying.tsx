import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface FlyingProps {
  type: 'rotate'
  options?: {
    degree: number
    infinity?: boolean
    repeatType?: 'loop' | 'reverse' | 'mirror'
  }
  children: ReactNode
}

export default function Flying({
  children,
  options: initialOptions,
}: FlyingProps) {
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
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
      initial={{ x: '150%', rotate: 0 }}
      animate={{ x: 0, rotate: initialOptions?.degree || 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
