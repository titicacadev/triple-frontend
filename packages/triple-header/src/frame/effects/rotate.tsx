import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export type RotateEffect = { type: 'rotate' } & Omit<
  RotateProps,
  'index' | 'frameCount'
>

interface RotateProps {
  options?: ExtendedEffectOptions
  index: number
  frameCount: number
}

export function Rotate({
  children,
  options = {},
  index,
  frameCount,
}: PropsWithChildren<RotateProps>) {
  const transition = generateTransition(options, index, frameCount)

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
