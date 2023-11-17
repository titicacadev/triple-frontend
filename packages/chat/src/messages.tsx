import BubbleContainer from './bubble-container/bubble-container'
import BubbleUI, {
  ImageBubbleUIProp,
  ProductBubbleUIProp,
  RichBubbleUIProp,
  TextBubbleUIProp,
} from './bubble/bubble-ui'
import { UserInterface } from './types'

interface MessageBase<User extends UserInterface> {
  id: string | number
  sender: User
  createdAt?: string
  blinded?: boolean
  deleted?: boolean
}

type MessageInterface<
  Message extends MessageBase<User>,
  User extends UserInterface,
> = Message &
  (
    | TextBubbleUIProp
    | ImageBubbleUIProp
    | RichBubbleUIProp
    | ProductBubbleUIProp
  )

interface MessagesProp<
  Message extends MessageBase<User>,
  User extends UserInterface,
> {
  messages: MessageInterface<Message, User>[]
  pendingMessages: MessageInterface<Message, User>[]
  failedMessages: MessageInterface<Message, User>[]
  me: UserInterface
  onRetry?: () => void
  onRetryCancel?: () => void
}

export default function Messages<
  Message extends MessageBase<User>,
  User extends UserInterface,
>({
  messages,
  pendingMessages,
  failedMessages,
  me,
  onRetry,
  onRetryCancel,
}: MessagesProp<Message, User>) {
  function renderMessages(
    type: 'normal' | 'failed' | 'pending',
    messages: MessageInterface<Message, User>[],
  ) {
    return messages.map(({ id, sender, createdAt, ...message }) => {
      const my = sender.id === me.id

      return (
        <BubbleContainer
          key={id}
          id={id.toString()}
          my={my}
          unreadCount={null}
          createdAt={createdAt}
          user={{
            photo: sender.profile.photo,
            name: sender.profile.name,
            userId: sender.id,
            unregistered: sender.unregistered,
          }}
          showInfo={message.type !== 'product'}
          {...(type === 'failed' && {
            onRetry,
            onRetryCancel,
          })}
        >
          <BubbleUI
            key={id}
            id={id.toString()}
            my={my}
            {...message}
            unfriended={sender.unfriended}
          />
        </BubbleContainer>
      )
    })
  }

  return (
    <>
      <div id="messages_list">{renderMessages('normal', messages)}</div>
      <div id="failed_messages_list">
        {renderMessages('pending', pendingMessages)}
      </div>
      <div id="pending_messages_list">
        {renderMessages('failed', failedMessages)}
      </div>
    </>
  )
}
