import { useEffect, useState, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'

import { MotionContainer } from '../../motion-container'

const variants = {
  active: () => ({
    opacity: [0, 1],
    transition: { duration: 1.5 },
  }),
  exit: () => ({ opacity: 0, transition: { duration: 1 } }),
}

export function FadeInOut({ children }: { children: ReactNode[] }) {
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
      <MotionContainer
        key={visibleFrameIndex}
        variants={variants}
        animate="active"
        exit="exit"
      >
        {children[visibleFrameIndex]}
      </MotionContainer>
    </AnimatePresence>
  )
}
