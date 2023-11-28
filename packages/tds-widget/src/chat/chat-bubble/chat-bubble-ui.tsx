import React, { PropsWithChildren, useState } from 'react'
import { Container } from '@titicaca/tds-ui'

import {
  ImagePayload,
  MessageType,
  ProductPayload,
  RichPayload,
  TextPayload,
} from '../types'
import { ChatBubbleStyle } from '../types/ui'

import { BubbleInfo } from './bubble-info'
import {
  DeleteButton,
  ProfileImage,
  ProfileName,
  RetryButton,
  SendingFailureHandlerContainer,
} from './elements'
import BubblePayload from './bubble-payload'
import BlindedBubble from './blinded'

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
  onCancel,
  children,
  showBubbleInfo,
}: PropsWithChildren<{
  createdAt?: string
  unreadCount: number | null
  onRetry?: () => Promise<boolean> | undefined
  onCancel?: () => void
  showBubbleInfo: boolean
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
          <DeleteButton
            onClick={() => {
              onCancel?.()
              setShow(false)
            }}
          />
        </SendingFailureHandlerContainer>
      ) : (
        <>
          {showBubbleInfo && (
            <BubbleInfo
              unreadCount={unreadCount}
              date={createdAt}
              css={{ marginRight: 8, textAlign: 'right' }}
            />
          )}
        </>
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
  showBubbleInfo,
  children,
}: {
  profileImageUrl?: string
  profileName?: string
  unreadCount: number | null
  createdAt?: string
  showBubbleInfo: boolean
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

        {createdAt && showBubbleInfo ? (
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
   * `Product`: 상품 정보를 보낼 수 있는 메시지 타입. 처음 접속 시 보여진다.
   */
  payload: TextPayload | ImagePayload | RichPayload | ProductPayload
  profileImageUrl?: string
  profileName?: string
  unreadCount: number | null
  createdAt?: string
  blindedAt?: string
  blindedText?: string
  /**
   * 'sent' 타입일 때, 메시지 전송 실패할 경우 재시도하는 함수
   */
  onRetry?: () => Promise<boolean> | undefined
  /**
   * 'sent' 타입일 때, 메시지 전송 실패할 경우 재시도를 취소하는 함수
   */
  onCancel?: () => void
  bubbleStyle?: ChatBubbleStyle
}

export function ChatBubbleUI({
  type,
  payload,
  unreadCount,
  createdAt,
  profileImageUrl,
  profileName,
  blindedAt,
  blindedText,
  onRetry,
  bubbleStyle,
}: ChatBubbleUIProps) {
  switch (type) {
    case 'sent': {
      const sentBubbleStyle = bubbleStyle?.sent
      return (
        <SentChatContainer
          createdAt={createdAt}
          showBubbleInfo={payload.type !== MessageType.PRODUCT}
          unreadCount={unreadCount}
          onRetry={onRetry}
        >
          {blindedAt ? (
            <BlindedBubble
              my
              blindedText={blindedText}
              bubbleStyle={
                sentBubbleStyle
                  ? {
                      ...sentBubbleStyle,
                      textColor:
                        sentBubbleStyle.textColor.blinded ||
                        sentBubbleStyle.textColor.normal,
                    }
                  : undefined
              }
            />
          ) : (
            <BubblePayload
              payload={payload}
              my
              bubbleStyle={
                sentBubbleStyle
                  ? {
                      ...sentBubbleStyle,
                      textColor: sentBubbleStyle.textColor.normal,
                      linkColor: sentBubbleStyle.link?.color,
                      linkUnderline: sentBubbleStyle.link?.underline,
                    }
                  : undefined
              }
            />
          )}
        </SentChatContainer>
      )
    }
    case 'received': {
      const receivedBubbleStyle = bubbleStyle?.received
      return (
        <ReceivedChatContainer
          unreadCount={unreadCount}
          createdAt={createdAt}
          showBubbleInfo={payload.type !== MessageType.PRODUCT}
          profileImageUrl={profileImageUrl}
          profileName={profileName}
        >
          {blindedAt ? (
            <BlindedBubble
              my={false}
              blindedText={blindedText}
              bubbleStyle={
                receivedBubbleStyle
                  ? {
                      ...receivedBubbleStyle,
                      textColor:
                        receivedBubbleStyle.textColor.blinded ||
                        receivedBubbleStyle.textColor.normal,
                    }
                  : undefined
              }
            />
          ) : (
            <BubblePayload
              payload={payload}
              my={false}
              bubbleStyle={
                receivedBubbleStyle
                  ? {
                      ...receivedBubbleStyle,
                      textColor: receivedBubbleStyle.textColor.normal,
                      linkColor: receivedBubbleStyle.link?.color,
                      linkUnderline: receivedBubbleStyle.link?.underline,
                    }
                  : undefined
              }
            />
          )}
        </ReceivedChatContainer>
      )
    }
    default:
      return null
  }
}