import { captureException } from '@sentry/browser'

import { HttpResponse } from './types'

function captureHttpError<Response extends HttpResponse<any, any>>(
  response: Response,
): void {
  if (response.error) {
    captureException(response.error)
  }
}

export { captureHttpError }
