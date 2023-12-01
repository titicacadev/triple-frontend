import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export type FlyingEffect = { type: 'flying' } & Omit<
  FlyingProps,
  'index' | 'frameCount'
>

interface FlyingProps {
  options?: ExtendedEffectOptions
  index: number
  frameCount: number
}

export function Flying({
  children,
  options = {},
  index,
  frameCount,
}: PropsWithChildren<FlyingProps>) {
  const transition = generateTransition(
    { ...options, duration: 0.3 },
    index,
    frameCount,
  )

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
