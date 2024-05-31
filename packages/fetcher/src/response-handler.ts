import * as Sentry from '@sentry/nextjs'

import { HttpResponse } from './types'

export function captureHttpError<
  Response extends HttpResponse<unknown, unknown>,
>(response: Response): void {
  if (response.ok === false) {
    Sentry.withScope((scope) => {
      scope.setTag('errorType', 'HTTPError')
      scope.setExtra('body', response.parsedBody)
      Sentry.captureException(new Error(`${response.status} - ${response.url}`))
    })
  }
}
