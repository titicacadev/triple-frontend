import { Autolinker } from 'autolinker'

import { ImageBubble, RichBubble, TextBubble, ProductBubble } from '../bubbles'
import { useChat } from '../chat'
import { ImagePayload, MessageType, RichPayload, TextPayload } from '../types'
import { BackgroundColor } from '../types/ui'

interface BubblePayloadProps {
  payload: TextPayload | ImagePayload | RichPayload | ProductPayload
  my: boolean
  bubbleStyle?: {
    backgroundColor: BackgroundColor
    textColor: string
    linkColor?: string
    linkUnderline?: boolean
  }
}

const BubblePayload = ({ payload, my, bubbleStyle }: BubblePayloadProps) => {
  const { textBubbleFontSize, textBubbleMaxWidthOffset, onTextBubbleClick } =
    useChat()

  switch (payload.type) {
    case MessageType.IMAGES:
      return <ImageBubble imageInfos={payload.images} />
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
        <RichBubble my={my} items={payload.items} bubbleStyle={bubbleStyle} />
      )
    case MessageType.PRODUCT:
      return <ProductBubble my={my} product={payload.product} />
    default:
      return null
  }
}

export default BubblePayload
