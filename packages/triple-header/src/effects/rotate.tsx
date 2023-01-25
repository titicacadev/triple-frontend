import { PropsWithChildren } from 'react'

import { MotionContainer } from '../motion-container'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export interface RotateProps {
  type: 'rotate'
  options: ExtendedEffectOptions
}

export default function Rotate({
  children,
  options = {},
}: PropsWithChildren<RotateProps>) {
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
      key={`rotate_${stringifyTransition(transition)}`}
      animate={{ rotate: options.degree || 0 }}
      transition={transition}
    >
      {children}
    </MotionContainer>
  )
}
