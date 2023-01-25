import { PropsWithChildren } from 'react'

import { MotionContainer } from '../motion-container'

export default function None({ children }: PropsWithChildren) {
  return <MotionContainer>{children}</MotionContainer>
}
