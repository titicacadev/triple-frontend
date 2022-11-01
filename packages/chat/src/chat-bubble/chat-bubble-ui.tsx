import React, { PropsWithChildren, useState } from 'react'
import { Autolinker } from 'autolinker'
import { Container } from '@titicaca/core-elements'

import { TextPayload, ImagePayload, RichPayload, MessageType } from '../types'
import { ImageBubble, TextBubble, RichBubble } from '../bubbles'

import { BubbleInfo } from './bubble-info'
import {
  ChatContainer,
  SendingFailureHandlerContainer,
  RetryButton,
  DeleteButton,
  ProfileImage,
  ProfileName,
} from './elements'

import { useChat } from '@titicaca/chat'

const CHAT_CONTAINER_STYLES = {
  marginTop: 20,
  position: 'relative',
  minHeight: 46,
} as const

function SentChatContainer({
  createdAt,
  unreadCount,
  onRetry,
  children,
}: PropsWithChildren<{
  createdAt?: string
  unreadCount: number | null
  onRetry?: () => Promise<boolean>
}>) {
  const [show, setShow] = useState<boolean>(true)

  return show ? (
    <ChatContainer css={{ textAlign: 'right', ...CHAT_CONTAINER_STYLES }}>
      {!createdAt ? (
        <SendingFailureHandlerContainer>
          <RetryButton
            onClick={async () => {
              if (onRetry) {
                if (await onRetry()) {
                  setShow(false)
                }
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
    </ChatContainer>
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
    <ChatContainer css={{ ...CHAT_CONTAINER_STYLES }}>
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
    </ChatContainer>
  )
}

interface BubblePayloadProps {
  payload: TextPayload | ImagePayload | RichPayload
  my: boolean
}

function BubblePayload({ payload, my }: BubblePayloadProps) {
  const {
    textBubbleFontSize,
    textBubbleMaxWidthOffset,
    mediaUrlBase,
    cloudinaryName,
    onRichBubbleButtonBeforeRouting,
    onImageBubbleClick,
    onTextBubbleClick,
  } = useChat()

  switch (payload.type) {
    case MessageType.IMAGES:
      return (
        <ImageBubble
          imageInfos={payload.images}
          cloudinaryName={cloudinaryName}
          mediaUrlBase={mediaUrlBase}
          onClick={onImageBubbleClick}
        />
      )
    case MessageType.TEXT:
      return (
        <TextBubble
          size={textBubbleFontSize}
          maxWidthOffset={textBubbleMaxWidthOffset}
          tailPosition={my ? 'right' : 'left'}
          backgroundColor={my ? 'blue' : 'gray'}
          margin={my ? { left: 8 } : undefined}
        >
          <div
            onClick={onTextBubbleClick}
            aria-hidden
            dangerouslySetInnerHTML={{
              __html: Autolinker.link(payload.message, {
                newWindow: true,
                stripPrefix: false,
              }),
            }}
          />
        </TextBubble>
      )
    case MessageType.RICH:
      return (
        <RichBubble
          my={my}
          items={payload.items}
          textBubbleFontSize={textBubbleFontSize}
          textBubbleMaxWidthOffset={textBubbleMaxWidthOffset}
          onButtonBeforeRouting={onRichBubbleButtonBeforeRouting}
          cloudinaryName={cloudinaryName}
          mediaUrlBase={mediaUrlBase}
          onImageBubbleClick={onImageBubbleClick}
        />
      )
    default:
      return null
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ChatBubbleUIProps {
  type: 'sent' | 'received'
  payload: TextPayload | ImagePayload | RichPayload
  profileImageUrl?: string
  profileName?: string
  unreadCount: number | null
  createdAt?: string
  onRetry?: () => Promise<boolean>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
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
