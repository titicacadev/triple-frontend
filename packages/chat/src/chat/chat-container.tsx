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
  container: ElementType
  inputElement?: ElementType
  postMessage?: (
    payload: TextPayload | ImagePayload,
  ) => Promise<{ success: boolean; newMessages: MessageInterface[] }>
}

const defaultOnImageBubbleClick = (imageInfos: MetaDataInterface[]) => {
  window.open(imageInfos[0].originalUrl, '_blank')
}

const ChatContainer = ({
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
  const [postMessage, setPostMessage] = useState<PostMessageActionType | null>(
    null,
  )

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

export default ChatContainer
