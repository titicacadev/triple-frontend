import { ComponentProps } from 'react'
import DOMPurify from 'dompurify'

import {
  ChatMessageInterface,
  ChatMessagePayloadType,
  ChatRoomUser,
  DisplayTargetAll,
  UserInterface,
  UserType,
} from '../../types'
import OriginalMessages from '../../messages'
import { getProfileImageUrl } from '../../utils'
import { UnsentMessage } from '../messages-reducer'
import { getUserIdentifier } from '../../utils/user'
import { RichBubbleUIProp } from '../../bubble/bubble-ui'

export type ChatRoomMessageInterface<T = UserType> = Omit<
  ChatMessageInterface<T>,
  'sender'
> & {
  sender: UserInterface
}

type OriginalMessagesPropTypes<T = UserType> = ComponentProps<
  typeof OriginalMessages<ChatRoomMessageInterface<T>, UserInterface>
>

export default function Messages<T = UserType>({
  me,
  messages,
  pendingMessages,
  failedMessages,
  displayTarget,
  showReactions = false,
  shouldSplitRichMessage = false,
  ...props
}: {
  me: ChatRoomUser<T>
  messages: ChatMessageInterface<T>[]
  pendingMessages: UnsentMessage<ChatMessageInterface<T>>[]
  failedMessages: UnsentMessage<ChatMessageInterface<T>>[]
  displayTarget: T
  showReactions?: boolean
  shouldSplitRichMessage?: boolean
} & Omit<
  OriginalMessagesPropTypes<T>,
  | 'me'
  | 'messages'
  | 'pendingMessages'
  | 'failedMessages'
  | 'richMessageSplitter'
>) {
  return (
    <OriginalMessages<ChatRoomMessageInterface<T>, UserInterface>
      messages={convertMessages(me, messages, displayTarget, showReactions)}
      pendingMessages={convertMessages(
        me,
        pendingMessages,
        displayTarget,
        showReactions,
      )}
      failedMessages={convertMessages(
        me,
        failedMessages,
        displayTarget,
        showReactions,
      )}
      me={convertChatUserToMessageUser(me)}
      richMessageSplitter={
        shouldSplitRichMessage ? richMessageSplitter : undefined
      }
      {...props}
    />
  )
}

function richMessageSplitter<T = UserType>(
  message: OriginalMessagesPropTypes<T>['messages'][number],
  block: RichBubbleUIProp['value']['blocks'][number],
) {
  return {
    ...message,
    type: block.type,
    ...('message' in block && {
      value: { message: block.message },
    }),
    ...('images' in block && {
      value: { images: block.images },
    }),
    value: {
      ...block,
    },
  }
}

function convertMessages<T = UserType>(
  me: ChatRoomUser<T>,
  messages: ChatMessageInterface<T>[],
  roomDisplayTarget: T,
  showReactions?: boolean,
): OriginalMessagesPropTypes<T>['messages']

function convertMessages<T = UserType>(
  me: ChatRoomUser<T>,
  messages: UnsentMessage<ChatMessageInterface<T>>[],
  roomDisplayTarget: T,
  showReactions?: boolean,
): OriginalMessagesPropTypes<T>['pendingMessages']

function convertMessages<T = UserType>(
  me: ChatRoomUser<T>,
  messages:
    | ChatMessageInterface<T>[]
    | UnsentMessage<ChatMessageInterface<T>>[],
  roomDisplayTarget: T,
  showReactions = false,
):
  | OriginalMessagesPropTypes<T>['messages']
  | OriginalMessagesPropTypes<T>['pendingMessages'] {
  return messages.map(({ displayTarget: messageDisplayTarget, ...message }) => {
    const payload = getDisplayedPayload({
      payload: message.payload,
      alternativePayload: message.alternative,
      messageDisplayTarget,
      roomDisplayTarget,
    })

    const { type, value } = getMessageTypeAndValue(payload)

    const sender = convertChatUserToMessageUser(message.sender || me)

    return {
      ...message,
      id: message.id,
      sender,
      ...('createdAt' in message && { createdAt: message.createdAt }),
      blinded: !!message.blindedAt,
      type,
      value,
      extra: message.payload?.extra,
      ...(showReactions &&
        message.reactions?.thanks && {
          thanks: message.reactions.thanks,
        }),
    }
  })
}

function getDisplayedPayload<T = UserType>({
  payload,
  alternativePayload,
  messageDisplayTarget,
  roomDisplayTarget,
}: {
  payload: ChatMessageInterface<T>['payload']
  alternativePayload?: ChatMessageInterface<T>['payload']
  messageDisplayTarget?: T[] | DisplayTargetAll
  roomDisplayTarget: T
}) {
  if (!messageDisplayTarget || messageDisplayTarget === 'all') {
    return payload
  }
  if (messageDisplayTarget.includes(roomDisplayTarget)) {
    return payload
  }
  return alternativePayload ?? payload
}

function getMessageTypeAndValue<T = UserType>(
  payload: ChatMessageInterface<T>['payload'],
) {
  switch (payload.type) {
    case ChatMessagePayloadType.TEXT:
      return {
        type: payload.type,
        value: { message: DOMPurify.sanitize(payload.message) },
      }
    case ChatMessagePayloadType.IMAGES:
      return { type: payload.type, value: { images: payload.images } }
    case ChatMessagePayloadType.RICH:
      return { type: payload.type, value: { blocks: payload.items } }
    case ChatMessagePayloadType.PRODUCT:
      return { type: payload.type, value: { product: payload.product } }
  }
}

function convertChatUserToMessageUser<T = UserType>(
  user: ChatMessageInterface<T>['sender'] | ChatRoomUser<T>,
) {
  return {
    id: getUserIdentifier(user),
    profile: {
      name: user.profile.name,
      photo: user.profile.thumbnail || getProfileImageUrl(user),
    },
  }
}
