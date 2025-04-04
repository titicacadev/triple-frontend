import { withScope, captureException } from '@sentry/nextjs'
import { GraphQLError } from 'graphql'

import { HttpResponse } from './types'
import { NEED_LOGIN_IDENTIFIER } from './factories'
import { readResponseBody } from './fetcher'

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

interface ErrorResponseBody {
  exception: string
  message: string
  status: string
}

type ResponseWithError = Pick<Response, 'headers' | 'ok' | 'status' | 'url'> & {
  ok: false
  parsedBody: ErrorResponseBody
}

export async function handle401Error<SuccessBody, FailureBody>(
  response: HttpResponse<SuccessBody, FailureBody> | Response,
) {
  if (response.ok || response.status !== 401) {
    return response
  }

  let exception = ''

  if (response instanceof Response) {
    const parsedBody = (await readResponseBody(response)) as ErrorResponseBody
    exception = parsedBody.exception
  } else {
    const errorResponse = response as ResponseWithError
    if (errorResponse.status === 401) {
      exception = errorResponse.parsedBody.exception
    }
  }

  if (exception === ACCESS_TOKEN_EXPIRED_EXCEPTION) {
    return NEED_REFRESH_IDENTIFIER
  }
  return NEED_LOGIN_IDENTIFIER
}

interface ErrorResponse401 {
  status: number
  code: string
  sentryId: string
}

export function handleGql401Error(error: GraphQLError) {
  if (error.extensions) {
    const extensions = error.extensions as unknown as ErrorResponse401
    if (extensions.status === 401) {
      return NEED_LOGIN_IDENTIFIER
    }
  }
}
