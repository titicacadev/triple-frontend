import { useReducer } from 'react'

export enum ChatActions {
  INIT = 'INIT', // 최초 메시지 세팅
  PAST = 'PAST', // 이전 메세지 추가
  NEW = 'NEW', // 최신 메세지 추가
  UPDATE = 'UPDATE', // 메세지 업데이트
  MULTIPLE_UPDATE = 'MULTIPLE_UPDATE', // 여러 메세지 업데이트
  PENDING = 'PENDING', // 메세지 전송 응답 대기
  FAIL = 'FAIL', // 메시지 전송 실패
  REMOVE = 'REMOVE', // 전송 실패 메세지 삭제
}

export interface MessageBase<Id = string> {
  id: Id
  createdAt?: string
  parentMessage?: MessageBase<Id>
}

export interface ChatState<Message extends MessageBase<Id>, Id = string> {
  messages: Message[]
  pendingMessages: Omit<Message, 'createdAt'>[]
  failedMessages: Omit<Message, 'createdAt'>[]
  hasPrevMessage: boolean
  hasNextMessage: boolean
}

export const initialChatState = {
  messages: [],
  pendingMessages: [],
  failedMessages: [],
  hasPrevMessage: true,
  hasNextMessage: true,
}

export type ChatAction<Message extends MessageBase<Id>, Id = string> =
  | {
      action: ChatActions.INIT
      messages: Message[]
    }
  | {
      action: ChatActions.PAST
      messages: Message[]
    }
  | {
      action: ChatActions.NEW
      messages: Message[]
    }
  | {
      action: ChatActions.UPDATE
      message: Message
    }
  | {
      action: ChatActions.MULTIPLE_UPDATE
      messages: Message[]
    }
  | {
      action: ChatActions.PENDING
      message: Message
    }
  | {
      action: ChatActions.FAIL
      message: Message
    }
  | {
      action: ChatActions.REMOVE
      message: Message
    }

function ChatReducer<Message extends MessageBase<Id>, Id = string>(
  state: ChatState<Message, Id>,
  action: ChatAction<Message, Id>,
): ChatState<Message, Id> {
  switch (action.action) {
    case ChatActions.INIT:
      return {
        ...state,
        messages: action.messages,
      }

    case ChatActions.PAST:
      return {
        ...state,
        messages: [...action.messages, ...state.messages],
        hasPrevMessage: action.messages.length > 0,
      }

    case ChatActions.NEW:
      return {
        ...state,
        messages: deduplicateAndSortMessages<Message, Id>(
          state.messages,
          action.messages,
        ),
        hasNextMessage: action.messages.length > 0,
      }

    case ChatActions.UPDATE:
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

    case ChatActions.MULTIPLE_UPDATE:
      return {
        ...state,
        messages: state.messages.map((message) => {
          const updatedMessage = action.messages.find(
            (updated) => updated.id === message.id,
          )
          return updatedMessage || message
        }),
      }

    case ChatActions.PENDING:
      return {
        ...state,
        pendingMessages: [...state.pendingMessages, action.message],
        failedMessages: state.failedMessages.filter(
          (message) => message.id !== action.message.id,
        ),
      }

    case ChatActions.FAIL:
      return {
        ...state,
        pendingMessages: state.pendingMessages.filter(
          (message) => message.id === action.message.id,
        ),
        failedMessages: [...state.failedMessages, action.message],
      }

    case ChatActions.REMOVE:
      return {
        ...state,
        pendingMessages: state.pendingMessages.filter(
          (message) => message.id === action.message.id,
        ),
        failedMessages: state.failedMessages.filter(
          (message) => message.id !== action.message.id,
        ),
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
    React.Reducer<ChatState<Message, Id>, ChatAction<Message, Id>>
  >(ChatReducer, initialChatState)
}

function deduplicateAndSortMessages<
  Message extends MessageBase<Id>,
  Id = string,
>(prev: Message[], next: Message[]) {
  const copiedMessages = [...prev, ...next]

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
