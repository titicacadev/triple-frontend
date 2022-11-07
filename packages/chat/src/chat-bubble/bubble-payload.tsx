import { Autolinker } from 'autolinker'
import React from 'react'

import {
  ImageBubble,
  ImagePayload,
  MessageType,
  RichBubble,
  RichPayload,
  TextBubble,
  TextPayload,
  useChat,
} from '@titicaca/chat'

interface BubblePayloadProps {
  payload: TextPayload | ImagePayload | RichPayload
  my: boolean
}

const BubblePayload = ({ payload, my }: BubblePayloadProps) => {
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
          my={my}
          size={textBubbleFontSize}
          maxWidthOffset={textBubbleMaxWidthOffset}
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

export default BubblePayload
