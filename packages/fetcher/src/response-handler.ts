import { withScope, captureException } from '@sentry/nextjs'

import { HttpResponse } from './types'
import { NEED_LOGIN_IDENTIFIER } from './factories'

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

export const ACCESS_TOKEN_EXPIRED_EXCEPTION = 'AccessTokenExpiredException'
export const NEED_REFRESH_IDENTIFIER = 'NEED_REFRESH'

type ResponseWithError = Pick<Response, 'headers' | 'ok' | 'status' | 'url'> & {
  ok: false
  parsedBody: { exception: string; message: string; status: string }
}

export function handle401Error<SuccessBody, FailureBody>(
  response: HttpResponse<SuccessBody, FailureBody>,
) {
  if (!response.ok) {
    const errorResponse = response as ResponseWithError
    if (errorResponse.status === 401) {
      const { exception } = errorResponse.parsedBody
      if (exception === ACCESS_TOKEN_EXPIRED_EXCEPTION) {
        return NEED_REFRESH_IDENTIFIER
      }
      return NEED_LOGIN_IDENTIFIER
    }
  }
  return response
}
