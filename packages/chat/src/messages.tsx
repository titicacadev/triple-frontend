import { ComponentType } from 'react'

import BubbleContainer from './bubble-container/bubble-container'
import BubbleUI, {
  BubbleType,
  BubbleTypeArray,
  BubbleUIProps,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { type: string; value: any }
  )
//

interface MessagesProp<
  Message extends MessageBase<User>,
  User extends UserInterface,
> {
  messages: MessageInterface<Message, User>[]
  pendingMessages: MessageInterface<Message, User>[]
  failedMessages: MessageInterface<Message, User>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customBubble?: { [key: string]: ComponentType<any> }
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
  customBubble,
  ...bubbleProps
}: MessagesProp<Message, User> &
  Omit<
    BubbleUIProps,
    'id' | 'my' | 'blinded' | 'deleted' | 'unfriended' | 'type' | 'value'
  >) {
  function getBubble({
    message,
    my,
  }: {
    message: MessageInterface<Message, User>
    my: boolean
  }) {
    const { id, sender, type, value, ...rest } = message
    const CustomBubble = customBubble?.[type]
    if (CustomBubble) {
      return <CustomBubble {...message} />
    }

    if (!isBubbleType(type)) {
      throw new Error(`${type}에 해당하는 Bubble이 존재하지 않습니다.`)
    }

    return (
      <BubbleUI
        key={id}
        id={id.toString()}
        my={my}
        unfriended={sender.unfriended}
        type={type}
        value={value}
        {...rest}
        {...bubbleProps}
      />
    )
  }

  function renderMessages(
    listType: 'normal' | 'failed' | 'pending',
    messages: MessageInterface<Message, User>[],
  ) {
    return messages.map((message) => {
      const { id, sender, createdAt, type } = message
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
          showInfo={type !== 'product'}
          {...(listType === 'failed' && {
            onRetry: () => {
              onRetry?.()
            },
            onRetryCancel: () => {
              onRetryCancel?.()
            },
          })}
        >
          {getBubble({ message, my })}
        </BubbleContainer>
      )
    })
  }

  return (
    <>
      <div id="messages_list">{renderMessages('normal', messages)}</div>
      <div id="pending_messages_list">
        {renderMessages('pending', pendingMessages)}
      </div>
      <div id="failed_messages_list">
        {renderMessages('failed', failedMessages)}
      </div>
    </>
  )
}

function isBubbleType(type: string): type is BubbleType {
  return BubbleTypeArray.includes(type as BubbleType)
}
