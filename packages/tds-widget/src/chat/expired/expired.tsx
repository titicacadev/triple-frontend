import { ForwardedRef, forwardRef, PropsWithChildren } from 'react'

import { Button, Container, ButtonIcon } from './elements'

interface ExpiredProps {
  description?: string
  onChatRestart?: () => void
}

const DEFAULT_DESCRIPTION = `추가 문의가 필요하신 경우\n파트너에게 새로운 채팅으로 문의해주세요.`

/**
 * 색상 변경이 필요한 경우, ExpiredThemeProvider와 함께 사용해 주세요.
 */
export function ExpiredImpl(
  {
    description = DEFAULT_DESCRIPTION,
    onChatRestart,
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
          {/* TODO: 아이콘 변경 */}
          <ButtonIcon src="https://triple-dev.titicaca-corp.com/tna/static/images/icon_chat.svg" />
          새로운 채팅 시작
        </Button>
      ) : null}
      {children}
    </Container>
  )
}

export const Expired = forwardRef(ExpiredImpl)
