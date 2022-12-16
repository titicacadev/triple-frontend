import React, { ElementType, PropsWithChildren, useState } from 'react'

import {
  ImagePayload,
  MessageInterface,
  MetaDataInterface,
  PostMessageActionType,
  TextPayload,
} from '../types'

import { ChatContext, ChatContextValue } from './chat-context'

export interface ChatContainerProps extends ChatContextValue {
  /**
   * Chat list와 보내기 Input 창을 감싸는 컨테이너로, 커스텀 스타일 등 적용 가능
   */
  container: ElementType
  /**
   * input 창, 보내기 버튼 등을 포함하는 컴포넌트
   */
  inputElement?: ElementType
  /**
   * 메시지를 전송하는 api를 래핑하는 함수
   */
  postMessage?: (
    payload: TextPayload | ImagePayload,
  ) => Promise<{ success: boolean; newMessages: MessageInterface[] }>
}

const defaultOnImageBubbleClick = (imageInfos: MetaDataInterface[]) => {
  window.open(imageInfos[0].originalUrl, '_blank')
}

/**
 * chat-room 페이지에 삽입되는 컴포넌트입니다.
 *
 * ChatContainer에는 공통 필수 prop, Chat 에는 로직, api 관련된 prop을 전달해 구성합니다.
 */
export const ChatContainer = ({
  container: Container,
  inputElement: Input,
  children,

  textBubbleFontSize,
  textBubbleMaxWidthOffset,
  mediaUrlBase,
  cloudinaryName,
  onRichBubbleButtonBeforeRouting,
  onImageBubbleClick = defaultOnImageBubbleClick,
  onTextBubbleClick,
}: PropsWithChildren<ChatContainerProps>) => {
  const [postMessage, setPostMessage] =
    useState<PostMessageActionType | null>(null)

  return (
    <ChatContext.Provider
      value={{
        textBubbleFontSize,
        textBubbleMaxWidthOffset,
        mediaUrlBase,
        cloudinaryName,
        onRichBubbleButtonBeforeRouting,
        onImageBubbleClick,
        onTextBubbleClick,
        setPostMessage,
      }}
    >
      <Container>{children}</Container>
      {Input && postMessage ? <Input postMessage={postMessage} /> : null}
    </ChatContext.Provider>
  )
}
