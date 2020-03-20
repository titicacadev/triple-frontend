import React, { Reducer, ReducerState, Dispatch, ReducerAction } from 'react'

import diff from './json-diff'
import printDiff from './print-diff'

const dispatchMaps = new Map()

class LoggerDispatcher<R extends Reducer<any, any>> {
  reducer: R

  state: ReducerState<R>

  originalDispatch: Dispatch<ReducerAction<R>>

  constructor(
    reducer: R,
    store: [ReducerState<R>, Dispatch<ReducerAction<R>>],
  ) {
    this.reducer = reducer
    this.state = store[0]
    this.originalDispatch = store[1]

    this.dispatch = this.dispatch.bind(this)
  }

  dispatch(action: ReducerAction<R>) {
    console.group(action.type, action.payload)
    printDiff(diff(this.state, this.reducer(this.state, action)))
    console.groupEnd()

    this.originalDispatch(action)
  }
}

function injectDevtool(original: typeof React.useReducer) {
  return <R extends Reducer<any, any>, I>(
    reducer: R,
    initializerArg: I & ReducerState<R>,
    initializer: (arg: I & ReducerState<R>) => ReducerState<R>,
  ) => {
    const store = original(reducer, initializerArg, initializer)

    let dispatcher = dispatchMaps.get(store[1])

    if (!dispatcher) {
      dispatcher = new LoggerDispatcher(reducer, store)

      dispatchMaps.set(store[1], dispatcher)
    }

    dispatcher.state = store[0]

    return [dispatcher.state, dispatcher.dispatch]
  }
}

;(React.useReducer as any) = injectDevtool(React.useReducer)
