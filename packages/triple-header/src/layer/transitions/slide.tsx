import { useEffect, useState, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'

import { wrap } from '../../utils'

export default function Slide({ children }: { children: ReactNode[] }) {
  const [page, setPage] = useState(0)
  const index = wrap(0, children.length, page)

  useEffect(() => {
    const timer = setInterval(() => setPage((prev) => prev + 1), 3000)

    return () => clearInterval(timer)
  }, [page])

  return (
    <AnimatePresence initial exitBeforeEnter>
      {children[index]}
    </AnimatePresence>
  )
}
