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

export default function FadeInOut({ children }: { children: ReactNode[] }) {
  const [page, setPage] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () =>
        setPage((prev) => {
          return prev === children.length - 1 ? 0 : prev + 1
        }),
      3000,
    )

    return () => clearInterval(timer)
  }, [children, page])

  return (
    <AnimatePresence>
      <MotionContainer
        key={page}
        variants={variants}
        animate="active"
        exit="exit"
      >
        {children[page]}
      </MotionContainer>
    </AnimatePresence>
  )
}
