import { TextBubble } from './text'
import { ImageBubble } from './image'
import { RichBubble } from './rich'
import {
  BlindedBubbleProp,
  ImageBubbleProp,
  ProductBubbleProp,
  RichBubbleProp,
  TextBubbleProp,
} from './type'
import { ProductBubble } from './product'
import BlindedBubble from './blinded'

type BubbleType = 'blinded' | 'text' | 'images' | 'rich' | 'product'

interface BubbleUIProp<Type extends BubbleType> {
  type: Type
}

type BubbleUIProps =
  | (BubbleUIProp<'blinded'> & BlindedBubbleProp)
  | (BubbleUIProp<'text'> & TextBubbleProp)
  | (BubbleUIProp<'images'> & ImageBubbleProp)
  | (BubbleUIProp<'rich'> & RichBubbleProp)
  | (BubbleUIProp<'product'> & ProductBubbleProp)

export default function BubbleUI({ ...bubble }: BubbleUIProps) {
  switch (bubble.type) {
    case 'blinded':
      return <BlindedBubble {...bubble} />
    case 'text':
      return <TextBubble {...bubble} />
    case 'images':
      return <ImageBubble {...bubble} />
    case 'rich':
      return <RichBubble {...bubble} />
    case 'product':
      return <ProductBubble {...bubble} />
    //   case MessageType.DELETED:
    //     return <DeletedBubble />
    default:
      throw new Error('지원하지 않는 메시지 타입입니다.')
  }
}
