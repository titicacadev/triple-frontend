import { NextMiddleware, NextResponse } from 'next/server'

import { MiddlewareFactory } from './types'

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): NextMiddleware {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }

  return () => {
    return NextResponse.next()
  }
}
