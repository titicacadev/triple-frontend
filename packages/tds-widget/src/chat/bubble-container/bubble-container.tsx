import { PropsWithChildren } from 'react'
import { Container } from '@titicaca/tds-ui'

import { DEFAULT_MESSAGE_ID_PREFIX } from '../chat/constants'

import { BubbleInfo } from './bubble-info'
import {
  DeleteButton,
  ProfileImage,
  ProfileName,
  RetryButton,
  SendingFailureHandlerContainer,
  Thanks,
} from './elements'

const CHAT_CONTAINER_STYLES = {
  marginTop: 20,
  position: 'relative',
  minHeight: 46,
  width: '100%',
} as const

interface ContainerBaseProp {
  id: string
  /** 메시지 생성 시간 */
  createdAt?: string // Date?
  /** 해당 메시지를 읽지 않은 유저의 수 */
  unreadCount: number | null
  /** 시간 정보 등의 정보의 노출 여부 */
  showInfo?: boolean
  /** 좋아요 정보 */
  thanks?: { count: number; haveMine: boolean }
  /** 좋아요 아이콘 클릭 시 작동하는 함수 */
  onThanksClick?: () => void
}

type SentBubbleContainerProp = PropsWithChildren<
  ContainerBaseProp & {
    /** 전송 실패한 메시지 재전송 시도 함수 */
    onRetry?: () => void
    /** 전송 실패한 메시지 삭제 함수 */
    onRetryCancel?: () => void
  }
>

function SentBubbleContainer({
  id,
  createdAt,
  onRetry,
  onRetryCancel,
  unreadCount,
  showInfo = true,
  thanks,
  onThanksClick,
  children,
}: SentBubbleContainerProp) {
  return (
    <Container
      id={`${DEFAULT_MESSAGE_ID_PREFIX}-${id}`}
      css={{ textAlign: 'right', ...CHAT_CONTAINER_STYLES }}
    >
      <div>
        {!createdAt && onRetry && onRetryCancel ? (
          <SendingFailureHandlerContainer>
            <RetryButton onClick={onRetry} />
            <DeleteButton onClick={onRetryCancel} />
          </SendingFailureHandlerContainer>
        ) : null}

        {createdAt && showInfo ? (
          <BubbleInfo
            unreadCount={unreadCount}
            date={createdAt}
            css={{ marginRight: 8, textAlign: 'right' }}
          />
        ) : null}

        {children}
      </div>

      {thanks && onThanksClick ? (
        <Thanks
          count={thanks.count}
          haveMine={thanks.haveMine}
          onClick={onThanksClick}
          css={{ display: 'inline-flex', marginTop: 6, marginRight: 10 }}
        />
      ) : null}
    </Container>
  )
}

type ReceivedBubbleContainerProp = PropsWithChildren<
  ContainerBaseProp & {
    /** 메시지 발신인 정보 */
    user?: {
      photo?: string
      name: string
      userId: string
      unregistered?: boolean
    }
  }
>

function ReceivedBubbleContainer({
  id,
  user,
  unreadCount,
  createdAt,
  showInfo,
  thanks,
  onThanksClick,
  children,
}: ReceivedBubbleContainerProp) {
  return (
    <Container
      id={`${DEFAULT_MESSAGE_ID_PREFIX}-${id}`}
      css={{ ...CHAT_CONTAINER_STYLES }}
    >
      <ProfileImage src={user?.photo} />
      <Container css={{ marginLeft: 50 }}>
        <ProfileName size="mini" alpha={0.8} margin={{ bottom: 5 }}>
          {user?.name || ''}
        </ProfileName>

        {children}

        {createdAt && showInfo ? (
          <BubbleInfo
            unreadCount={unreadCount}
            date={createdAt}
            css={{ marginLeft: 8, textAlign: 'left' }}
          />
        ) : null}

        {thanks && onThanksClick ? (
          <Thanks
            count={thanks.count}
            haveMine={thanks.haveMine}
            onClick={onThanksClick}
            css={{ marginTop: 6 }}
          />
        ) : null}
      </Container>
    </Container>
  )
}

export type BubbleContainerProp = { my: boolean } & SentBubbleContainerProp &
  ReceivedBubbleContainerProp

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
