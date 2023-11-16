import BubbleUI, {
  ImageBubbleUIProp,
  ProductBubbleUIProp,
  RichBubbleUIProp,
  TextBubbleUIProp,
} from './bubble/bubble-ui'
import { UserInterface } from './types'

type MessageInterface<MessageId = string, T = Record<string, never>> = {
  id: MessageId
  key?: string
  sender: UserInterface
  blinded?: boolean
  deleted?: boolean
  unfriended?: boolean
} & (
  | TextBubbleUIProp
  | ImageBubbleUIProp
  | RichBubbleUIProp
  | ProductBubbleUIProp
) &
  T

interface MessagesProp<
  MessageId extends string | number = string,
  T = Record<string, never>,
> {
  messages: MessageInterface<MessageId, T>[]
  failedMessages: MessageInterface<MessageId>[]
  me: UserInterface
  onRetry?: () => void
  onRetryCancel?: () => void
}

export default function Messages<MessageId extends string | number = string>({
  messages,
  me,
}: MessagesProp<MessageId>) {
  return messages.map(({ id, sender, ...message }) => {
    const my = sender.id === me.id

    return <BubbleUI key={id} id={id.toString()} my={my} {...message} />
  })
}
