import { RoomType, UserType } from '../types'

import { BaseChatListAction, BaseChatListState, ChatListActions } from './types'

export const ChatListReducer = <F, T = RoomType, U = UserType>(
  state: BaseChatListState<F, T, U>,
  chatAction: BaseChatListAction<F, T, U>,
): BaseChatListState<F, T, U> => {
  switch (chatAction.action) {
    case ChatListActions.INIT_CHAT_LIST:
      return {
        ...state,
        rooms: chatAction.rooms,
        total: chatAction.total,
        totalPage: Math.ceil(chatAction.total / (state.pageSize ?? 0)),
        filter: { ...chatAction.filter },
        searchUserId: chatAction.searchUserId,
        me: chatAction.me,
        lastMessageId: Math.max(
          ...chatAction.rooms.map((room) => room.lastMessageId),
        ),
      }

    case ChatListActions.REFRESH_LIST:
      return {
        ...state,
        rooms: chatAction.rooms,
        lastMessageId: Math.max(
          ...chatAction.rooms.map((room) => room.lastMessageId),
        ),
        total: chatAction.total,
        totalPage: Math.ceil(chatAction.total / (state.pageSize ?? 0)),
      }

    case ChatListActions.CHANGE_FILTER:
      return {
        ...state,
        filter: chatAction.filter,
      }

    default:
      return state
  }
}
