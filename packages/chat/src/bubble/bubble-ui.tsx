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
  ImageBubbleProp,
  ProductBubbleProps,
  RichBubbleProp,
  TextBubbleProp,
} from './type'
import { ProductBubble } from './product'

type BubbleUIProps =
  | (TextPayload & TextBubbleProp)
  | (ImagePayload & ImageBubbleProp)
  | (RichPayload & RichBubbleProp)
  | (ProductPayload & ProductBubbleProps)

export default function BubbleUI({ ...bubble }: BubbleUIProps) {
  switch (bubble.type) {
    case MessageType.TEXT:
      return <TextBubble {...bubble} />
    case MessageType.IMAGES:
      return <ImageBubble {...bubble} />
    case MessageType.RICH:
      return <RichBubble {...bubble} />
    case MessageType.PRODUCT:
      return <ProductBubble {...bubble} />
  }
}
