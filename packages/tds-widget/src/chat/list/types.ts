import {
  ChatRoomListItemInterface,
  ChatUserInterface,
  RoomInterface,
  RoomType,
  UserType,
} from '../types'
import { ValueOf } from '../types/base'

export interface BaseChatListState<F, T = RoomType, U = UserType> {
  rooms: (RoomInterface<T, U> | ChatRoomListItemInterface<T, U>)[]
  total: number
  me?: ChatUserInterface<U>
  filter: F
  searchUserId?: string
  lastMessageId?: number
  pageSize?: number
  totalPage?: number
  currentPage?: number
}

export const ChatListActions = {
  INIT_CHAT_LIST: 'INIT_CHAT_LIST',
  REFRESH_LIST: 'REFRESH_LIST',
  CHANGE_FILTER: 'CHANGE_FILTER',
} as const

export type ChatListActions = ValueOf<typeof ChatListActions>

export type BaseChatListAction<F, T = RoomType, U = UserType> =
  | ({
      action: 'INIT_CHAT_LIST'
    } & Pick<
      BaseChatListState<F, T, U>,
      'rooms' | 'filter' | 'me' | 'total' | 'searchUserId'
    >)
  | ({
      action: 'REFRESH_LIST'
    } & Pick<BaseChatListState<F, T, U>, 'rooms' | 'total'>)
  | ({
      action: 'CHANGE_FILTER'
    } & Pick<BaseChatListState<F, T, U>, 'filter'>)

export type ExtensionAction<T extends { action: string }> = {
  [K in T['action']]: Extract<T, { action: K }>
}[T['action']] & {
  [key: string]: unknown
}

type ExtensionReducers<S, T extends { action: string }> = {
  [action in T['action']]: (state: S, action: T) => S
}

export interface Extension<
  F,
  S,
  T = RoomType,
  U = UserType,
  A extends { action: string } = { action: string },
> {
  name: string
  initialState?: Partial<BaseChatListState<F, T, U> & S>
  reducers:
    | ExtensionReducers<BaseChatListState<F, T, U>, BaseChatListAction<F, T, U>>
    | ExtensionReducers<BaseChatListState<F, T, U> & S, ExtensionAction<A>>
}

export type ExtensibleReducerResult<
  State,
  F,
  T = RoomType,
  U = UserType,
  A extends { action: string } = { action: string },
> = [State, (action: BaseChatListAction<F, T, U> | ExtensionAction<A>) => void]
