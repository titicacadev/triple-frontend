import { useEffect, useState, ReactNode } from 'react'

import { MotionContainer } from '../../motion-container'

const variants = {
  fadeIn: {
    opacity: [0, 1],
    transition: { duration: 1.5 },
  },
  fadeOut: { opacity: 0, transition: { duration: 1 } },
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
    <>
      {children.map((slide, index) => (
        <MotionContainer
          key={index}
          initial="fadeOut"
          variants={variants}
          animate={index === visibleFrameIndex ? 'fadeIn' : 'fadeOut'}
        >
          {slide}
        </MotionContainer>
      ))}
    </>
  )
}
