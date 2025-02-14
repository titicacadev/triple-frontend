import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

import { CustomMiddleware, MiddlewareFactory } from './types'

/**
 * TF 14.0.11의 middlewares/src/chain 참고하여 작성
 * https://github.com/titicacadev/triple-frontend/blob/ceee9a7116dfbf39cc1363013a43cfb0060a9539/packages/middlewares/src/chain.ts
 */
export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response
  }
}
