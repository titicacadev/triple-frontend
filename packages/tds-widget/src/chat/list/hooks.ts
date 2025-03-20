import { useMemo, useReducer } from 'react'

import { RoomType, UserType } from '../types'

import {
  BaseChatListAction,
  BaseChatListState,
  ExtensibleReducerResult,
  Extension,
  ExtensionAction,
} from './types'
import { isBaseChatListAction } from './utils'
import { ChatListReducer } from './reducer'

export const initialChatState: BaseChatListState<{
  readOnly: boolean
  searchValue: null | string
  page: number
}> = {
  currentPage: 0,
  pageSize: 5,
  totalPage: 0,
  rooms: [],
  total: NaN,
  filter: {
    readOnly: false,
    searchValue: null,
    page: 1,
  },
  searchUserId: undefined,
}

export function useExtensibleReducer<
  F,
  S,
  T = RoomType,
  U = UserType,
  A extends { action: string } = { action: string },
>(
  extension: Extension<F, S, T, U, A> | null = null,
): ExtensibleReducerResult<BaseChatListState<F, T, U> & S, F, T, U, A> {
  type CombinedState = BaseChatListState<F, T, U> & S

  const combinedReducer = useMemo(() => {
    return (
      state: CombinedState,
      action: BaseChatListAction<F, T, U> | ExtensionAction<A>,
    ): CombinedState => {
      if (isBaseChatListAction(action)) {
        return ChatListReducer(state, action) as CombinedState
      }

      if (extension) {
        const actionKey = action.action as keyof typeof extension.reducers
        const handler = extension.reducers[actionKey]
        if (handler) {
          return handler(
            state,
            action as BaseChatListAction<F, T, U> & ExtensionAction<A>,
          ) as CombinedState
        }
      }

      return state
    }
  }, [extension])

  const mergedInitialState = useMemo(() => {
    return {
      ...initialChatState,
      ...extension?.initialState,
      filter: {
        ...initialChatState.filter,
        ...extension?.initialState?.filter,
      },
    } as CombinedState
  }, [extension])

  const [state, dispatchBase] = useReducer(combinedReducer, mergedInitialState)

  const dispatch = useMemo(() => {
    return (action: BaseChatListAction<F, T, U> | ExtensionAction<A>) => {
      dispatchBase(action)
    }
  }, [dispatchBase])

  return [state, dispatch]
}
