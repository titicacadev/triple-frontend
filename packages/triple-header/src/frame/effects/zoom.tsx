import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

export type ZoomEffect = { type: 'zoom' } & Omit<
  ZoomProps,
  'index' | 'totalFramesCount'
>

interface ZoomProps {
  options?: InitialEffectOptions
  index: number
  totalFramesCount: number
}

export function Zoom({
  children,
  options = {},
  index,
  totalFramesCount,
}: PropsWithChildren<ZoomProps>) {
  const transition = generateTransition(options, index, totalFramesCount)

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
