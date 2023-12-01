import { ReactNode } from 'react'

import { MotionContainer } from '../../motion-container'

const variants = {
  slide: ({ index, length }: { index: number; length: number }) => ({
    opacity: [0, 1, 1, 0],
    transition: {
      repeat: Infinity,
      duration: 3,
      times: [0, 0, 1, 1],
      delay: 3 * index,
      repeatDelay: 3 * length - 3,
    },
  }),
}

export function Slide({ children }: { children: ReactNode[] }) {
  return (
    <>
      {children.map((slide, index) => (
        <MotionContainer
          key={index}
          animate="slide"
          custom={{ index, length: children.length }}
          variants={variants}
        >
          {slide}
        </MotionContainer>
      ))}
    </>
  )
}
