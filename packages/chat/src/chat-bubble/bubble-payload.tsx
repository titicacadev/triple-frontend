import { Autolinker } from 'autolinker'

import { ImageBubble, RichBubble, TextBubble } from '../bubbles'
import { useChat } from '../chat'
import { ImagePayload, MessageType, RichPayload, TextPayload } from '../types'
import { BackgroundColor } from '../types/ui'

interface BubblePayloadProps {
  payload: TextPayload | ImagePayload | RichPayload
  my: boolean
  bubbleStyle?: {
    backgroundColor: BackgroundColor
    textColor: string
    linkColor?: string
    linkUnderline?: boolean
  }
}

const BubblePayload = ({ payload, my, bubbleStyle }: BubblePayloadProps) => {
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
          bubbleStyle={bubbleStyle}
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
          bubbleStyle={bubbleStyle}
        />
      )
    default:
      return null
  }
}

export default BubblePayload
