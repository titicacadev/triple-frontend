import { PropsWithChildren } from 'react'
import { Container } from '@titicaca/core-elements'

import { BubbleInfo } from './bubble-info'
import {
  DeleteButton,
  ProfileImage,
  ProfileName,
  RetryButton,
  SendingFailureHandlerContainer,
} from './elements'

const CHAT_CONTAINER_STYLES = {
  marginTop: 20,
  position: 'relative',
  minHeight: 46,
  width: '100%',
} as const

type SentBubbleContainerProp = PropsWithChildren<{
  /** 메시지 생성 시간 */
  createdAt?: string // Date?
  /** 전송 실패한 메시지 재전송 시도 함수 */
  onRetry?: () => void
  /** 전송 실패한 메시지 삭제 함수 */
  onRetryCancel?: () => void
  /** 해당 메시지를 읽지 않은 유저의 수 */
  unreadCount: number | null
  /** 시간 정보 등의 정보의 노춮 여부 */
  showInfo?: boolean
}>

function SentBubbleContainer({
  createdAt,
  onRetry,
  onRetryCancel,
  unreadCount,
  showInfo = true,
  children,
}: SentBubbleContainerProp) {
  return (
    <Container css={{ textAlign: 'right', ...CHAT_CONTAINER_STYLES }}>
      {!createdAt ? (
        <SendingFailureHandlerContainer>
          <RetryButton onClick={onRetry} />
          <DeleteButton onClick={onRetryCancel} />
        </SendingFailureHandlerContainer>
      ) : showInfo ? (
        <BubbleInfo
          unreadCount={unreadCount}
          date={createdAt}
          css={{ marginRight: 8, textAlign: 'right' }}
        />
      ) : null}
      {children}
    </Container>
  )
}

type ReceivedBubbleContainerProp = PropsWithChildren<{
  /** 메시지 생성 시간 */
  createdAt?: string // Date?
  /** 메시지 발신인 정보 */
  profile?: {
    imageUrl: string
    name: string
    userId: string
    unregister?: boolean
  }
  /** 해당 메시지를 읽지 않은 유저의 수 */
  unreadCount: number | null
  /** 시간 정보 등의 정보의 노춮 여부 */
  showInfo?: boolean
}>

function ReceivedBubbleContainer({
  profile,
  unreadCount,
  createdAt,
  showInfo,
  children,
}: ReceivedBubbleContainerProp) {
  return (
    <Container css={{ ...CHAT_CONTAINER_STYLES }}>
      <ProfileImage src={profile?.imageUrl} />
      <Container css={{ marginLeft: 50 }}>
        <ProfileName size="mini" alpha={0.8} margin={{ bottom: 5 }}>
          {profile?.name || ''}
        </ProfileName>
        {children}
        {createdAt && showInfo ? (
          <BubbleInfo
            unreadCount={unreadCount}
            date={createdAt}
            css={{ marginLeft: 8, textAlign: 'left' }}
          />
        ) : null}
      </Container>
    </Container>
  )
}

export type BubbleContainerProp =
  | ({ my: true } & SentBubbleContainerProp)
  | ({ my: false } & ReceivedBubbleContainerProp)

export default function BubbleContainer({
  my,
  children,
  ...props
}: BubbleContainerProp) {
  if (my) {
    return <SentBubbleContainer {...props}>{children}</SentBubbleContainer>
  }
  return (
    <ReceivedBubbleContainer {...props}>{children}</ReceivedBubbleContainer>
  )
}