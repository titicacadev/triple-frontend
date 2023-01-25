import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export default function None({ children }: PropsWithChildren) {
  return (
    <motion.div
      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  )
}
