import { ImageBubble, RichBubble, ProductBubble, TextBubble } from '../bubble'
import { useChat } from '../chat'
import {
  ImagePayload,
  MessageType,
  RichPayload,
  TextPayload,
  ProductPayload,
} from '../types'

interface BubblePayloadProps {
  id: string
  payload: TextPayload | ImagePayload | RichPayload | ProductPayload
  my: boolean
}

const BubblePayload = ({ id, payload, my, ...props }: BubblePayloadProps) => {
  const {
    textBubbleFontSize,
    textBubbleMaxWidthOffset,
    mediaUrlBase,
    cloudinaryName,
  } = useChat()

  switch (payload.type) {
    case MessageType.IMAGES:
      return <ImageBubble imageInfos={payload.images} {...props} />
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
        <RichBubble
          id={id}
          my={my}
          items={payload.items}
          cloudinaryName={cloudinaryName}
          mediaUrlBase={mediaUrlBase}
        />
      )
    case MessageType.PRODUCT:
      return <ProductBubble id={id} my={my} product={payload.product} />
    default:
      return null
  }
}

export default BubblePayload
