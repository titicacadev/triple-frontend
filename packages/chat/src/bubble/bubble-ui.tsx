import {
  ImagePayload,
  MessageType as OriginMessageType,
  ProductPayload,
  RichPayload,
  TextPayload,
} from '../types'

import { TextBubble } from './text'
import { ImageBubble } from './image'
import { RichBubble } from './rich'
import {
  BlindedBubbleProp,
  ImageBubbleProp,
  ProductBubbleProps,
  RichBubbleProp,
  TextBubbleProp,
} from './type'
import { ProductBubble } from './product'
import BlindedBubble from './blinded'

enum MessageUIType {
  BLINDED = 'blinded',
  DELETED = 'deleted',
}

const MessageType = { ...MessageUIType, ...OriginMessageType }

type BubbleUIProps =
  | (TextPayload & TextBubbleProp)
  | (ImagePayload & ImageBubbleProp)
  | (RichPayload & RichBubbleProp)
  | (ProductPayload & ProductBubbleProps)
  | ({ type: MessageUIType.BLINDED } & BlindedBubbleProp)

export default function BubbleUI({ ...bubble }: BubbleUIProps) {
  switch (bubble.type) {
    case MessageType.BLINDED:
      return <BlindedBubble {...bubble} />
    case MessageType.TEXT:
      return <TextBubble {...bubble} />
    case MessageType.IMAGES:
      return <ImageBubble {...bubble} />
    case MessageType.RICH:
      return <RichBubble {...bubble} />
    case MessageType.PRODUCT:
      return <ProductBubble {...bubble} />
    //   case MessageType.DELETED:
    //     return <DeletedBubble />
    default:
      throw new Error('지원하지 않는 메시지 타입입니다.')
  }
}
