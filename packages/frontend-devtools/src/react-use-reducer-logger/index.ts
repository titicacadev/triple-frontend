import React, { Reducer, ReducerState } from 'react'

import diff from './json-diff'
import printDiff from './print-diff'

function loggerMiddleware<R extends Reducer<any, any>>(next: R) {
  return ((state, action) => {
    // eslint-disable-next-line no-console
    console.group('Action:', action)
    const nextState = next(state, action)
    printDiff(diff(state, nextState))
    // eslint-disable-next-line no-console
    console.groupEnd()

    return nextState
  }) as R
}

function injectLogger(original: typeof React.useReducer) {
  return <R extends Reducer<any, any>, I>(
    reducer: R,
    initializerArg: I & ReducerState<R>,
    initializer: (arg: I & ReducerState<R>) => ReducerState<R>,
  ) => original(loggerMiddleware(reducer), initializerArg, initializer)
}

;(React.useReducer as any) = injectLogger(React.useReducer)
