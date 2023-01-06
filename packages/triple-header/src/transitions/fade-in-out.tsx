import { useEffect, useState, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { wrap } from '../utils'

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

export default function FadeInOut({ children }: { children: ReactNode[] }) {
  const [[page, direction], setPage] = useState([0, 0])
  const index = wrap(0, children.length, page)

  useEffect(() => {
    const timer = setInterval(() => setPage((prev) => [prev[0] + 1, 0]), 3000)

    return () => clearInterval(timer)
  }, [page])

  const transition: Transition = {
    ease: 'linear',
    duration: 3,
    repeat: Infinity,
    repeatType: 'loop',
  }

  return (
    <AnimatePresence exitBeforeEnter custom={direction}>
      <motion.div
        variants={variants}
        initial="enter"
        animate="active"
        transition={transition}
      >
        {children[index]}
      </motion.div>
    </AnimatePresence>
  )
}
