import { withScope, captureException } from '@sentry/nextjs'

import { HttpResponse } from './types'

export function captureHttpError<
  Response extends HttpResponse<unknown, unknown>,
>(response: Response): void {
  if (response.ok === false) {
    withScope((scope) => {
      scope.setTag('errorType', 'HTTPError')
      scope.setExtra('body', response.parsedBody)
      captureException(new Error(`${response.status} - ${response.url}`))
    })
  }
}
