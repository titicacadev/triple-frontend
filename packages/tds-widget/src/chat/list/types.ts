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

export type BaseChatListActions = ValueOf<typeof ChatListActions>

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

export interface ExtensionAction<
  T extends BaseChatListActions = BaseChatListActions,
> {
  action: T
  payload?: unknown
  [key: string]: unknown
}

interface ExtensionReducers<S, A extends ExtensionAction> {
  [actionType: string]: (state: S, action: A) => S
}

type ActionCreator<A> = (...args: unknown[]) => A

interface ActionCreators<A = ExtensionAction> {
  [actionName: string]: ActionCreator<A>
}

export interface Extension<
  F,
  S,
  T = RoomType,
  U = UserType,
  A extends ExtensionAction = ExtensionAction,
> {
  name: string
  initialState?: Partial<BaseChatListState<F, T, U> & S>
  reducers: ExtensionReducers<
    BaseChatListState<F, T, U> & S,
    BaseChatListAction<F, T, U> & A
  >
  actions?: ActionCreators<BaseChatListAction<F, T, U> & A>
}

export type ExtensibleReducerResult<State, F, T = RoomType, U = UserType> = [
  State,
  (action: BaseChatListAction<F, T, U> | ExtensionAction) => void,
]
