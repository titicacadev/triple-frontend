import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

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
  const transition = generateTransition(options)

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
