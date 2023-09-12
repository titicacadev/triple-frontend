import { Autolinker } from 'autolinker'

import { ImageBubble, RichBubble, TextBubble } from '../bubbles'
import { useChat } from '../chat'
import {
  BackgroundColor,
  ImagePayload,
  MessageType,
  RichPayload,
  TextPayload,
} from '../types'

interface BubblePayloadProps {
  payload: TextPayload | ImagePayload | RichPayload
  my: boolean
  bubbleColor?: { backgroundColor: BackgroundColor; text: string }
}

const BubblePayload = ({ payload, my, bubbleColor }: BubblePayloadProps) => {
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
          bubbleColor={bubbleColor}
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
          bubbleColor={bubbleColor}
        />
      )
    default:
      return null
  }
}

export default BubblePayload
