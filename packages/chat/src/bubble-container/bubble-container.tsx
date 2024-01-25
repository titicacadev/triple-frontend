import { PropsWithChildren } from 'react'
import { Container } from '@titicaca/core-elements'

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
  position: 'relative',
  width: '100%',
} as const

interface ContainerBaseProp {
  id: string
  /** 메시지 생성 시간 */
  createdAt?: string // Date?
  /** 해당 메시지를 읽지 않은 유저의 수 */
  unreadCount: number | null
  /** 시간 정보, 안읽음 숫자 등의 정보의 노출 여부 */
  showInfo?: boolean
  /** 날짜 정보의 노출 여부 */
  showDateInfo?: boolean
  /** 시간 정보의 노출 여부 */
  showTimeInfo?: boolean
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
  showDateInfo,
  showTimeInfo,
  thanks,
  onThanksClick,
  children,
  ...props
}: SentBubbleContainerProp) {
  return (
    <Container
      id={`${DEFAULT_MESSAGE_ID_PREFIX}-${id}`}
      css={{ textAlign: 'right', ...CHAT_CONTAINER_STYLES }}
      {...props}
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
            showDateInfo={showDateInfo}
            showTimeInfo={showTimeInfo}
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
    /** 프로필 노출 여부 */
    showProfile?: boolean
  }
>

function ReceivedBubbleContainer({
  id,
  user,
  unreadCount,
  createdAt,
  showInfo,
  showDateInfo,
  showTimeInfo,
  showProfile = true,
  thanks,
  onThanksClick,
  children,
  ...props
}: ReceivedBubbleContainerProp) {
  return (
    <Container
      id={`${DEFAULT_MESSAGE_ID_PREFIX}-${id}`}
      css={{ ...CHAT_CONTAINER_STYLES }}
      {...props}
    >
      {showProfile ? <ProfileImage src={user?.photo} /> : null}
      <Container css={{ marginLeft: 40 }}>
        {showProfile ? (
          <ProfileName alpha={0.7} margin={{ bottom: 5 }}>
            {user?.name || ''}
          </ProfileName>
        ) : null}

        {children}

        {createdAt && showInfo ? (
          <BubbleInfo
            unreadCount={unreadCount}
            showDateInfo={showDateInfo}
            showTimeInfo={showTimeInfo}
            date={createdAt}
            css={{ marginLeft: 4, textAlign: 'left' }}
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
