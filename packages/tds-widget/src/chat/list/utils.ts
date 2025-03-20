import { RoomType, UserType } from '../types'

import {
  BaseChatListAction,
  ChatListActions,
  Extension,
  ExtensionAction,
} from './types'

export function createExtension<
  F,
  S,
  T,
  U,
  A extends { action: string } = { action: string },
>(config: Extension<F, S, T, U, A>): Extension<F, S, T, U, A> {
  return {
    name: config.name,
    initialState: config.initialState || {},
    reducers: config.reducers,
  }
}

export function isBaseChatListAction<
  F,
  T = RoomType,
  U = UserType,
  A extends { action: string } = { action: string },
>(
  action: BaseChatListAction<F, T, U> | ExtensionAction<A>,
): action is BaseChatListAction<F, T, U> {
  return Object.values<string>(ChatListActions).includes(
    action.action as string,
  )
}
