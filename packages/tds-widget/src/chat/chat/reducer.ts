import { MessageInterface, OtherUnreadInterface } from '../types'

export enum ChatActions {
  INIT, // 최초에 메시지
  PAST, // 과거 메시지
  NEW, // 메시지 수신
  POST, // 메시지 전송
  FAILED_TO_POST, // 메시지 전송 실패
  UPDATE, // 읽음 표시 업데이트
  UPDATE_MESSAGE, // 메시지 하나 업데이트
  REMOVE_FROM_FAILED, // 전송 실패 메세지 재전송 또는 삭제
}

export interface ChatState {
  messages: MessageInterface[]
  failedMessages: MessageInterface[]
  beforeSentMessages: MessageInterface[]
  hasPrevMessage: boolean
  otherUnreadInfo: OtherUnreadInterface[]
  firstMessageId: number | null
  lastMessageId: number | null
}

export type ChatAction =
  | {
      action: ChatActions.INIT
      messages: MessageInterface[]
      lastMessageId: number
    }
  | {
      action: ChatActions.PAST
      messages: MessageInterface[]
    }
  | {
      action: ChatActions.NEW
      messages: MessageInterface[]
    }
  | {
      action: ChatActions.POST
      messages: MessageInterface[]
    }
  | {
      action: ChatActions.FAILED_TO_POST
      message: MessageInterface
    }
  | {
      action: ChatActions.UPDATE
      otherUnreadInfo: OtherUnreadInterface[]
    }
  | { action: ChatActions.UPDATE_MESSAGE; message: MessageInterface }
  | { action: ChatActions.REMOVE_FROM_FAILED; message: MessageInterface }

export const ChatReducer = (
  state: ChatState,
  action: ChatAction,
): ChatState => {
  switch (action.action) {
    case ChatActions.INIT:
      return {
        ...state,
        messages: action.messages,
        hasPrevMessage: true,
        firstMessageId: action.messages.length
          ? Number(action.messages[0].id)
          : 0,
        lastMessageId: Number(action.lastMessageId),
      }

    case ChatActions.PAST:
      if (action.messages.length) {
        return {
          ...state,
          messages: mergeMessages(action.messages, state.messages),
          firstMessageId: Number(action.messages[0].id),
          hasPrevMessage: true,
        }
      } else {
        return { ...state, hasPrevMessage: false }
      }

    case ChatActions.POST:
      return {
        ...state,
        messages: mergeMessages(state.messages, action.messages),
        lastMessageId: Number(action.messages[action.messages.length - 1].id),
      }

    case ChatActions.NEW:
      return {
        ...state,
        messages: mergeMessages(state.messages, action.messages),
        lastMessageId: Number(action.messages[action.messages.length - 1].id),
      }

    case ChatActions.FAILED_TO_POST:
      return {
        ...state,
        failedMessages: [...state.failedMessages, action.message],
      }

    case ChatActions.UPDATE:
      return {
        ...state,
        otherUnreadInfo: action.otherUnreadInfo,
      }
    case ChatActions.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.message.id ? action.message : message,
        ),
      }
    case ChatActions.REMOVE_FROM_FAILED:
      return {
        ...state,
        failedMessages: state.failedMessages.filter(
          (message) => message.id !== action.message.id,
        ),
      }

    default:
      throw new Error('unexpected action')
  }
}

export const initialChatState: ChatState = {
  messages: [],
  failedMessages: [],
  beforeSentMessages: [],
  hasPrevMessage: true,
  otherUnreadInfo: [],
  firstMessageId: null,
  lastMessageId: null,
}

function mergeMessages(
  beforeMessages: MessageInterface[],
  afterMessages: MessageInterface[],
) {
  const lastMessageId = beforeMessages.length
    ? beforeMessages[beforeMessages.length - 1].id
    : 0
  const filteredMessages = afterMessages.filter(
    (message) => Number(message.id) > Number(lastMessageId),
  )

  return [...beforeMessages, ...filteredMessages]
}
