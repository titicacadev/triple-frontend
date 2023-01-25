import { PropsWithChildren } from 'react'

import { MotionContainer } from '../motion-container'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

export interface ZoomProps {
  type: 'zoom'
  options?: InitialEffectOptions
}

export default function Zoom({
  children,
  options = {},
}: PropsWithChildren<ZoomProps>) {
  const transition = {
    ease: 'linear',
    duration: 3,
    ...(options.infinity && { repeat: Infinity }),
    ...(options.repeatType && {
      repeatType: options.repeatType,
    }),
  }

  return (
    <MotionContainer
      key={`zoom_${stringifyTransition(transition)}`}
      animate={{ scale: 1.2 }}
      transition={transition}
    >
      {children}
    </MotionContainer>
  )
}
