import { PropsWithChildren } from 'react'
import { Container, FlexBox } from '@titicaca/core-elements'

import { DEFAULT_MESSAGE_ID_PREFIX } from '../chat/constants'
import { DEFAULT_MAX_USERNAME_LENGTH, formatUsername } from '../utils/profile'

import { BubbleInfo } from './bubble-info'
import {
  DeleteButton,
  ProfileImage,
  ProfileName,
  RetryButton,
  SendingFailureHandlerContainer,
  Thanks,
} from './elements'
import { DeleteIcon, RetryIcon } from './icons'

const CHAT_CONTAINER_STYLES = {
  position: 'relative',
  width: '100%',
  userSelect: 'none',
} as const

interface ContainerBaseProp {
  id: string
  /** 메시지 생성 시간 */
  createdAt?: string // Date?
  /** 해당 메시지를 읽지 않은 유저의 수 */
  unreadCount: number | null
  /** 정보 영역 노출 여부 (시간, 안읽음 등) */
  showInfo?: boolean
  /** 날짜 정보의 노출 여부 */
  showDateInfo?: boolean
  /** 시간 정보의 노출 여부 */
  showTimeInfo?: boolean
  /** 좋아요 정보 */
  thanks?: { count: number; haveMine: boolean }
  /** 좋아요 아이콘 클릭 시 작동하는 함수 */
  onThanksClick?: () => void
  /** 답장하기 아이콘 클릭 시 작동하는 함수 */
  onReplyClick?: () => void
  /** 메세지 ref에 주입되는 callback 함수 */
  messageRefCallback?: (id: string) => void
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
  onReplyClick,
  messageRefCallback,
  children,
  ...props
}: SentBubbleContainerProp) {
  return (
    <Container
      id={`${DEFAULT_MESSAGE_ID_PREFIX}-${id}`}
      css={{ textAlign: 'right', ...CHAT_CONTAINER_STYLES }}
      ref={() => messageRefCallback?.(id)}
      {...props}
    >
      <div>
        {!createdAt && onRetry && onRetryCancel ? (
          <SendingFailureHandlerContainer>
            <RetryButton onClick={onRetry}>
              <RetryIcon />
            </RetryButton>
            <DeleteButton onClick={onRetryCancel}>
              <DeleteIcon />
            </DeleteButton>
          </SendingFailureHandlerContainer>
        ) : null}

        {createdAt && showInfo ? (
          <BubbleInfo
            align="right"
            unreadCount={unreadCount}
            date={createdAt}
            showDateInfo={showDateInfo}
            showTimeInfo={showTimeInfo}
            onReplyClick={onReplyClick}
            css={{ marginRight: 4, textAlign: 'right' }}
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

type ProfilePosition = 'left' | 'above'

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
    /** 프로필 노출 위치. default: left */
    profilePosition?: ProfilePosition
    /** 유저 프로필 클릭 */
    onUserClick?: (userId: string, unregistered: boolean) => void
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
  profilePosition = 'left',
  thanks,
  onThanksClick,
  onReplyClick,
  messageRefCallback,
  onUserClick,
  children,
  ...props
}: ReceivedBubbleContainerProp) {
  return (
    <Container
      id={`${DEFAULT_MESSAGE_ID_PREFIX}-${id}`}
      css={{ ...CHAT_CONTAINER_STYLES }}
      ref={() => messageRefCallback?.(id)}
      {...props}
    >
      {showProfile && profilePosition === 'left' ? (
        <ProfileImage
          src={
            user && !user.unregistered && user.photo
              ? user.photo
              : 'https://assets.triple.guide/images/ico-default-profile.svg'
          }
          onClick={() =>
            onUserClick && user
              ? onUserClick(user.userId, user.unregistered || false)
              : undefined
          }
        />
      ) : null}
      <Container css={{ marginLeft: profilePosition === 'left' ? 40 : 0 }}>
        {showProfile ? (
          <FlexBox
            flex
            flexDirection="row"
            alignItems="center"
            css={{ marginBottom: 5, gap: 8 }}
          >
            {profilePosition === 'above' && (
              <ProfileImage
                src={
                  user && !user.unregistered && user.photo
                    ? user.photo
                    : 'https://assets.triple.guide/images/ico-default-profile.svg'
                }
                onClick={() =>
                  onUserClick && user
                    ? onUserClick(user.userId, user.unregistered || false)
                    : undefined
                }
              />
            )}
            <ProfileName size="mini" alpha={0.8}>
              {user
                ? formatUsername({
                    name: user?.name,
                    unregistered: user?.unregistered,
                    maxLength: DEFAULT_MAX_USERNAME_LENGTH,
                  })
                : ''}
            </ProfileName>
          </FlexBox>
        ) : null}

        {children}

        {createdAt && showInfo ? (
          <BubbleInfo
            align="left"
            unreadCount={unreadCount}
            showDateInfo={showDateInfo}
            showTimeInfo={showTimeInfo}
            onReplyClick={onReplyClick}
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
