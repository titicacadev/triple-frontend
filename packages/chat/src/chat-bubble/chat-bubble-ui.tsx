import React, { PropsWithChildren, useState } from 'react'
import { Container } from '@titicaca/core-elements'

import { TextPayload, ImagePayload, RichPayload } from '../types'

import { BubbleInfo } from './bubble-info'
import {
  SendingFailureHandlerContainer,
  RetryButton,
  DeleteButton,
  ProfileImage,
  ProfileName,
} from './elements'
import BubblePayload from './bubble-payload'

const CHAT_CONTAINER_STYLES = {
  marginTop: 20,
  position: 'relative',
  minHeight: 46,
  width: '100%',
} as const

function SentChatContainer({
  createdAt,
  unreadCount,
  onRetry,
  children,
}: PropsWithChildren<{
  createdAt?: string
  unreadCount: number | null
  onRetry?: () => Promise<boolean> | undefined
}>) {
  const [show, setShow] = useState<boolean>(true)

  return show ? (
    <Container css={{ textAlign: 'right', ...CHAT_CONTAINER_STYLES }}>
      {!createdAt ? (
        <SendingFailureHandlerContainer>
          <RetryButton
            onClick={async () => {
              if (await onRetry?.()) {
                setShow(false)
              }
            }}
          />
          <DeleteButton onClick={() => setShow(false)} />
        </SendingFailureHandlerContainer>
      ) : (
        <BubbleInfo
          unreadCount={unreadCount}
          date={createdAt}
          css={{ marginRight: 8, textAlign: 'right' }}
        />
      )}

      {children}
    </Container>
  ) : null
}

function ReceivedChatContainer({
  profileImageUrl,
  profileName,
  unreadCount,
  createdAt,
  children,
}: {
  profileImageUrl?: string
  profileName?: string
  unreadCount: number | null
  createdAt?: string
  children: React.ReactNode
}) {
  return (
    <Container css={{ ...CHAT_CONTAINER_STYLES }}>
      <ProfileImage src={profileImageUrl} />
      <Container css={{ marginLeft: 50 }}>
        <ProfileName size="mini" alpha={0.8} margin={{ bottom: 5 }}>
          {profileName}
        </ProfileName>

        {children}

        {createdAt ? (
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

export interface ChatBubbleUIProps {
  type: 'sent' | 'received'
  /**
   * `Text`: 텍스트로 이루어진 메시지 타입,
   * `Image`: 이미지로 이루어진 메시지 타입,
   * `Rich`: 이미지, 텍스트, 버튼으로 이루어진 메시지 타입
   */
  payload: TextPayload | ImagePayload | RichPayload
  profileImageUrl?: string
  profileName?: string
  unreadCount: number | null
  createdAt?: string
  /**
   * 'sent' 타입일 때, 메시지 전송 실패할 경우 재시도하는 함수
   */
  onRetry?: () => Promise<boolean> | undefined
}

export function ChatBubbleUI({
  type,
  payload,
  unreadCount,
  createdAt,
  profileImageUrl,
  profileName,
  onRetry,
}: ChatBubbleUIProps) {
  switch (type) {
    case 'sent':
      return (
        <SentChatContainer
          createdAt={createdAt}
          unreadCount={unreadCount}
          onRetry={onRetry}
        >
          <BubblePayload payload={payload} my />
        </SentChatContainer>
      )
    case 'received':
      return (
        <ReceivedChatContainer
          unreadCount={unreadCount}
          createdAt={createdAt}
          profileImageUrl={profileImageUrl}
          profileName={profileName}
        >
          <BubblePayload payload={payload} my={false} />
        </ReceivedChatContainer>
      )
    default:
      return null
  }
}
