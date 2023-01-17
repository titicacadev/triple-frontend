import { useEffect, useState, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'

import { wrap } from '../utils'

export default function Slide({ children }: { children: ReactNode[] }) {
  const [[page, direction], setPage] = useState([0, 0])
  const index = wrap(0, children.length, page)

  useEffect(() => {
    const timer = setInterval(() => setPage((prev) => [prev[0] + 1, 0]), 800)

    return () => clearInterval(timer)
  }, [page])

  return (
    <AnimatePresence initial exitBeforeEnter custom={direction}>
      {children[index]}
    </AnimatePresence>
  )
}
