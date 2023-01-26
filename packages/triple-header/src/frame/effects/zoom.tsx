import { PropsWithChildren } from 'react'

import { MotionContainer } from '../../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

export interface ZoomProps {
  type: 'zoom'
  options?: InitialEffectOptions
}

export default function Zoom({
  children,
  options = {},
}: PropsWithChildren<ZoomProps>) {
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
