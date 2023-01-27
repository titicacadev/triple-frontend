import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

export type ZoomEffect = { type: 'zoom' } & ZoomProps

interface ZoomProps {
  options?: InitialEffectOptions
}

export function Zoom({ children, options = {} }: PropsWithChildren<ZoomProps>) {
  const transition = generateTransition(options)

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
