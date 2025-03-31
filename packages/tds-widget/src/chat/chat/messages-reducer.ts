import { useReducer } from 'react'

export enum MessagesActions {
  INIT = 'INIT', // 최초 메시지 세팅
  PAST = 'PAST', // 이전 메세지 추가
  NEW = 'NEW', // 최신 메세지 추가
  UPDATE = 'UPDATE', // 메세지 업데이트
  MULTIPLE_UPDATE = 'MULTIPLE_UPDATE', // 여러 메세지 업데이트
  PENDING = 'PENDING', // 메세지 전송 응답 대기
  FAIL = 'FAIL', // 메시지 전송 실패
  REMOVE = 'REMOVE', // 전송 실패 메세지 삭제
  HAS_PREV = 'HAS_PREV', // 이전 메세지 페이지네이션 플래그 설정
  HAS_NEXT = 'HAS_NEXT', // 다음 메세지 페이지네이션 플래그 설정
}

export type UnsentMessage<
  Message extends MessageBase<Id, Sender>,
  Id = string | number,
  Sender = unknown,
> = Omit<Message, 'createdAt' | 'sender'> & { sender?: Message['sender'] }

export interface MessageBase<Id = string | number, Sender = unknown> {
  id: Id
  createdAt?: string
  parentMessage?: MessageBase<Id> | null
  sender?: Sender
}

export interface MessagesState<Message extends MessageBase<Id>, Id = string> {
  messages: Message[]
  pendingMessages: UnsentMessage<Message, Id>[]
  failedMessages: UnsentMessage<Message, Id>[]
  hasPrevMessage: boolean
  hasNextMessage: boolean
}

export const initialMessagesState = {
  messages: [],
  pendingMessages: [],
  failedMessages: [],
  hasPrevMessage: true,
  hasNextMessage: true,
}

export type MessagesAction<Message extends MessageBase<Id>, Id = string> =
  | {
      action: MessagesActions.INIT
      messages: Message[]
      hasPrevMessage?: boolean
    }
  | {
      action: MessagesActions.PAST
      messages: Message[]
      hasPrevMessage?: boolean
    }
  | {
      action: MessagesActions.NEW
      messages: Message[]
    }
  | {
      action: MessagesActions.UPDATE
      message: Message
    }
  | {
      action: MessagesActions.MULTIPLE_UPDATE
      messages: Message[]
    }
  | {
      action: MessagesActions.PENDING
      message: UnsentMessage<Message, Id>
    }
  | {
      action: MessagesActions.FAIL
      message: UnsentMessage<Message, Id>
    }
  | {
      action: MessagesActions.REMOVE
      message: Pick<Message, 'id'>
    }
  | {
      action: MessagesActions.HAS_PREV
      hasPrevMessage: boolean
    }
  | {
      action: MessagesActions.HAS_NEXT
      hasNextMessage: boolean
    }

function MessagesReducer<Message extends MessageBase<Id>, Id = string>(
  state: MessagesState<Message, Id>,
  action: MessagesAction<Message, Id>,
): MessagesState<Message, Id> {
  switch (action.action) {
    case MessagesActions.INIT:
      return {
        ...state,
        messages: action.messages,
        hasPrevMessage: action.hasPrevMessage ?? state.hasPrevMessage,
      }

    case MessagesActions.PAST:
      return {
        ...state,
        messages: [...action.messages, ...state.messages],
        hasPrevMessage: action.hasPrevMessage ?? action.messages.length > 0,
      }

    case MessagesActions.NEW:
      return {
        ...state,
        messages: deduplicateAndSortMessages<Message, Id>(
          state.messages,
          action.messages,
        ),
      }

    case MessagesActions.UPDATE:
      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message.id === action.message.id) {
            return { ...message, ...action.message }
          }

          if (message.parentMessage?.id === action.message.id) {
            return {
              ...message,
              parentMessage: { ...message.parentMessage, ...action.message },
            }
          }

          return message
        }),
      }

    case MessagesActions.MULTIPLE_UPDATE:
      return {
        ...state,
        messages: state.messages.map((message) => {
          const updatedMessage = action.messages.find(
            (updated) => updated.id === message.id,
          )
          return updatedMessage || message
        }),
      }

    case MessagesActions.PENDING:
      return {
        ...state,
        pendingMessages: [...state.pendingMessages, action.message],
        failedMessages: state.failedMessages.filter(
          (message) => message.id !== action.message.id,
        ),
      }

    case MessagesActions.FAIL:
      return {
        ...state,
        pendingMessages: state.pendingMessages.filter(
          (message) => message.id !== action.message.id,
        ),
        failedMessages: [...state.failedMessages, action.message],
      }

    case MessagesActions.REMOVE:
      return {
        ...state,
        pendingMessages: state.pendingMessages.filter(
          (message) => message.id !== action.message.id,
        ),
        failedMessages: state.failedMessages.filter(
          (message) => message.id !== action.message.id,
        ),
      }

    case MessagesActions.HAS_PREV:
      return {
        ...state,
        hasPrevMessage: action.hasPrevMessage,
      }

    case MessagesActions.HAS_NEXT:
      return {
        ...state,
        hasNextMessage: action.hasNextMessage,
      }

    default:
      throw new Error('unexpected action')
  }
}

export function useMessagesReducer<
  Message extends MessageBase<Id>,
  Id = string,
>() {
  return useReducer<
    React.Reducer<MessagesState<Message, Id>, MessagesAction<Message, Id>>
  >(MessagesReducer, initialMessagesState)
}

function deduplicateAndSortMessages<
  Message extends MessageBase<Id>,
  Id = string,
>(messagesA: Message[], messagesB: Message[]) {
  const copiedMessages = [...messagesA, ...messagesB]

  const deduplicatedMessages = copiedMessages.filter(
    (messageInFilter, index) =>
      index ===
      copiedMessages.findIndex(
        (messageInFindIndex) => messageInFilter.id === messageInFindIndex.id,
      ),
  )

  deduplicatedMessages.sort(
    (a, b) =>
      new Date(a.createdAt || '').getTime() -
      new Date(b.createdAt || '').getTime(),
  )

  return deduplicatedMessages
}
