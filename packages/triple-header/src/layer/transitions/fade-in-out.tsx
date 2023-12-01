import { ReactNode } from 'react'

import { MotionContainer } from '../../motion-container'

const variants = {
  fadeInOut: ({ index, length }: { index: number; length: number }) => ({
    opacity: [0, 1, 1, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      times: [0, 0.375, 0.75, 1],
      delay: 3 * index,
      repeatDelay: 3 * length - 4,
    },
  }),
}

export function FadeInOut({ children }: { children: ReactNode[] }) {
  return (
    <>
      {children.map((slide, index) => (
        <MotionContainer
          key={index}
          custom={{ index, length: children.length }}
          animate="fadeInOut"
          variants={variants}
        >
          {slide}
        </MotionContainer>
      ))}
    </>
  )
}
