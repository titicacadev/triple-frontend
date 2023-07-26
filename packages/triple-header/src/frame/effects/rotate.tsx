import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export type RotateEffect = { type: 'rotate' } & Omit<
  RotateProps,
  'index' | 'totalFramesCount'
>

interface RotateProps {
  options?: ExtendedEffectOptions
  index: number
  totalFramesCount: number
}

export function Rotate({
  children,
  options = {},
  index,
  totalFramesCount,
}: PropsWithChildren<RotateProps>) {
  const transition = generateTransition(options, index, totalFramesCount)

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
