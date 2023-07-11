import { useEffect, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Slide({ children }: { children: ReactNode[] }) {
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () =>
        setVisibleFrameIndex((prevVisibleFrameIndex) => {
          return prevVisibleFrameIndex === children.length - 1
            ? 0
            : prevVisibleFrameIndex + 1
        }),
      3000,
    )

    return () => clearInterval(timer)
  }, [children, visibleFrameIndex])

  return (
    <AnimatePresence>
      <motion.div key={visibleFrameIndex} animate={{}}>
        {children[visibleFrameIndex]}
      </motion.div>
    </AnimatePresence>
  )
}
