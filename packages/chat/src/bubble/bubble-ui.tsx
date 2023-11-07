import {
  ImagePayload,
  MessageType,
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
  CustomMessageType,
} from './type'
import { ProductBubble } from './product'
import BlindedBubble from './blinded'

export const MessageUIType = { ...CustomMessageType, ...MessageType }

type BubbleUIProps =
  | (TextPayload & TextBubbleProp)
  | (ImagePayload & ImageBubbleProp)
  | (RichPayload & RichBubbleProp)
  | (ProductPayload & ProductBubbleProps)
  | ({ type: CustomMessageType.BLINDED } & BlindedBubbleProp)

export default function BubbleUI({ ...bubble }: BubbleUIProps) {
  switch (bubble.type) {
    case MessageUIType.BLINDED:
      return <BlindedBubble {...bubble} />
    case MessageUIType.TEXT:
      return <TextBubble {...bubble} />
    case MessageUIType.IMAGES:
      return <ImageBubble {...bubble} />
    case MessageUIType.RICH:
      return <RichBubble {...bubble} />
    case MessageUIType.PRODUCT:
      return <ProductBubble {...bubble} />
    //   case MessageType.DELETED:
    //     return <DeletedBubble />
    default:
      throw new Error('지원하지 않는 메시지 타입입니다.')
  }
}
