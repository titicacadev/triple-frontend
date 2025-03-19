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
  A extends ExtensionAction = ExtensionAction,
>(config: Extension<F, S, T, U, A>): Extension<F, S, T, U, A> {
  return {
    name: config.name,
    initialState: config.initialState || {},
    reducers: config.reducers,
    actions: config.actions,
  }
}

export function isBaseChatListAction<F>(
  action: BaseChatListAction<F> | ExtensionAction,
): action is BaseChatListAction<F> {
  return Object.values(ChatListActions).includes(action.action)
}
