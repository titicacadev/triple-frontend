import { useEffect, useState, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import { wrap } from '../utils'

const FadeInOutContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`
const variants = {
  active: () => ({
    opacity: [0, 1],
    transition: { duration: 0.1 },
  }),
  exit: () => ({ opacity: 0, transition: { duration: 1 } }),
}

export default function FadeInOut({ children }: { children: ReactNode[] }) {
  const [page, setPage] = useState(0)
  const index = wrap(0, children.length, page)

  useEffect(() => {
    const timer = setInterval(() => setPage((prev) => prev + 1), 1100)

    return () => clearInterval(timer)
  }, [page])

  return (
    <AnimatePresence>
      <FadeInOutContainer
        key={index}
        variants={variants}
        animate="active"
        exit="exit"
      >
        {children[index]}
      </FadeInOutContainer>
    </AnimatePresence>
  )
}
