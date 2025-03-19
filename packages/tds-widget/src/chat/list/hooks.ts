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
  F extends {
    readOnly: boolean
    searchValue: null | string
    page: number
  },
  S,
  T = RoomType,
  U = UserType,
  A extends ExtensionAction = ExtensionAction,
>(
  extension: Extension<F, S, T, U, A> | null = null,
  initialState: Partial<BaseChatListState<F>>,
): ExtensibleReducerResult<BaseChatListState<F, T, U> & S, F, T, U> {
  type CombinedState = BaseChatListState<F, T, U> & S

  const combinedReducer = useMemo(() => {
    return (
      state: CombinedState,
      action: BaseChatListAction<F, T, U> | ExtensionAction,
    ): CombinedState => {
      if (isBaseChatListAction(action)) {
        return ChatListReducer(state, action) as CombinedState
      }

      if (extension) {
        const handler = extension.reducers[action.action]
        if (handler) {
          return handler(
            state,
            action as BaseChatListAction<F, T, U> & A,
          ) as CombinedState
        }
      }

      return state
    }
  }, [extension])

  const mergedInitialState = useMemo<CombinedState>(() => {
    const baseState = { ...initialChatState } as CombinedState
    const withExtensionState = extension?.initialState
      ? { ...baseState, ...extension.initialState }
      : baseState

    return { ...withExtensionState, ...initialState }
  }, [extension, initialState])

  const [state, dispatchBase] = useReducer(combinedReducer, mergedInitialState)

  const dispatch = useMemo(() => {
    return (action: BaseChatListAction<F, T, U> | ExtensionAction) => {
      dispatchBase(action)
    }
  }, [dispatchBase])

  return [state, dispatch]
}
