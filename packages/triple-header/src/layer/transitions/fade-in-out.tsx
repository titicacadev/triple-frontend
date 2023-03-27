import { useEffect, useState, ReactElement } from 'react'
import { AnimatePresence } from 'framer-motion'

import { MotionContainer } from '../../motion-container'

const variants = {
  active: () => ({
    opacity: [0, 1],
    transition: { duration: 1.5 },
  }),
  exit: () => ({ opacity: 0, transition: { duration: 1 } }),
}

export function FadeInOut({ children }: { children: ReactElement[] }) {
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0)

  const imageUrls = children
    .map((child) => {
      if (typeof child === 'object') {
        return child.props.frame.value.image.sizes.full.url
      }

      return null
    })
    .filter((v) => v)

  useImagePreloader(imageUrls)

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

function useImagePreloader(imageUrls: string[]) {
  useEffect(() => {
    imageUrls.forEach((imageUrl) => {
      const img = new Image()
      img.src = imageUrl
    })
  }, [imageUrls])
}
