import { ReactNode } from 'react'

import { BubbleType } from './bubble/bubble-ui'

const BubbleElement: { [key: string]: BubbleType } = {
  blinded: 'blinded',
  text: 'text',
  images: 'images',
  rich: 'rich',
  product: 'product',
}

interface MessageInterface<
  MessageId = string,
  MessageType extends BubbleType = BubbleType,
> {
  id: MessageId
  type: MessageType
  key?: string
}

interface MessagesProp<
  MessageId = string,
  MessageType extends BubbleType = BubbleType,
> {
  messages: MessageInterface<MessageId, MessageType>[]
  failedMessages: MessageInterface<MessageId, MessageType>[]
  customBubble?: { [type: string]: ReactNode }
  onRetry: () => void
  onRetryCancel: () => void
}

export default function Messages({ messages, customBubble }: MessagesProp) {
  return messages.map((message, idx) => {
    const Bubble = BubbleElement[message.type]
    const CustomBubble = customBubble?.[message.type]
    const Element = Bubble || CustomBubble

    if (!Element) {
      throw new Error(`${message.type}에 일치하는 Bubble이 존재하지 않습니다.`)
    }

    return <div key={idx}>메시지</div>
  })
}
