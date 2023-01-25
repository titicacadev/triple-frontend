import { PropsWithChildren } from 'react'

import { MotionContainer } from '../motion-container'

import { InitialEffectOptions } from './types'
import { stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export interface FlyingProps {
  type: 'rotate'
  options?: ExtendedEffectOptions
}

export default function Flying({
  children,
  options = {},
}: PropsWithChildren<FlyingProps>) {
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
      key={`flying_${stringifyTransition(transition)}`}
      initial={{ x: '150%', rotate: 0 }}
      animate={{ x: 0, rotate: options.degree || 0 }}
      transition={transition}
    >
      {children}
    </MotionContainer>
  )
}
