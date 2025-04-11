import { ForwardedRef, forwardRef, PropsWithChildren } from 'react'

import { Button, Container, TalkIcon } from './elements'

interface ExpiredProps {
  description?: string
  onChatRestart?: () => void
  restartButtonText?: string
}

const DEFAULT_DESCRIPTION = `추가 문의가 필요하신 경우\n파트너에게 새로운 채팅으로 문의해주세요.`

/**
 * nol-theme-provider를 사용하는 컴포넌트 입니다.
 */
export function ExpiredImpl(
  {
    description = DEFAULT_DESCRIPTION,
    onChatRestart,
    restartButtonText,
    children,
    ...props
  }: PropsWithChildren<ExpiredProps>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Container {...props} ref={ref}>
      <h2>대화가 종료된 채팅입니다</h2>
      <p>{description}</p>
      {onChatRestart ? (
        <Button onClick={onChatRestart}>
          <TalkIcon />
          {restartButtonText || '새로운 채팅 시작하기'}
        </Button>
      ) : null}
      {children}
    </Container>
  )
}

export const Expired = forwardRef(ExpiredImpl)
