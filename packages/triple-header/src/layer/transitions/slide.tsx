import { useEffect, useState, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Slide({ children }: { children: ReactNode[] }) {
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
    <AnimatePresence initial exitBeforeEnter>
      {children[page]}
    </AnimatePresence>
  )
}
