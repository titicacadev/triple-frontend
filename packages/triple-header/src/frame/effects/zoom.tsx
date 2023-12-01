import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

export type ZoomEffect = { type: 'zoom' } & Omit<
  ZoomProps,
  'index' | 'frameCount'
>

interface ZoomProps {
  options?: InitialEffectOptions
  index: number
  frameCount: number
}

export function Zoom({
  children,
  options = {},
  index,
  frameCount,
}: PropsWithChildren<ZoomProps>) {
  const transition = generateTransition(options, index, frameCount)

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
