import { ImageBubble, RichBubble, ProductBubble, TextBubble } from '../bubble'
import { useChat } from '../chat'
import {
  ImagePayload,
  MessageType,
  RichPayload,
  TextPayload,
  ProductPayload,
} from '../types'
import { BackgroundColor } from '../types/ui'

interface BubblePayloadProps {
  id: string
  payload: TextPayload | ImagePayload | RichPayload | ProductPayload
  my: boolean
  bubbleStyle?: {
    backgroundColor: BackgroundColor
    textColor: string
    linkColor?: string
    linkUnderline?: boolean
  }
}

const BubblePayload = ({
  id,
  payload,
  my,
  bubbleStyle,
}: BubblePayloadProps) => {
  const { textBubbleFontSize, textBubbleMaxWidthOffset } = useChat()

  switch (payload.type) {
    case MessageType.IMAGES:
      return <ImageBubble imageInfos={payload.images} />
    case MessageType.TEXT:
      return (
        <TextBubble
          id={id}
          my={my}
          maxWidthOffset={textBubbleMaxWidthOffset}
          css={{
            margin: my ? '0 0 0 8px' : undefined,
            size: textBubbleFontSize,
          }}
          text={payload.message}
        />
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
