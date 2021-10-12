import { HttpError } from './error'
import { makeRequestParams } from './make-request-params'
import { readResponseBody } from './response-handler'
import {
  HttpErrorResponse,
  HTTPMethods,
  HttpResponse,
  RequestOptions,
} from './types'

const refetchStatuses = [502, 503, 504]

function makeFetchRetryable({
  fetch,
  retryCount,
}: {
  fetch: (href: string, requestInit?: RequestInit) => Promise<Response>
  retryCount: number
}) {
  function isRetryable({
    response,
    remainRetry,
  }: {
    response: Response
    remainRetry: number
  }): boolean {
    return (
      remainRetry > 0 &&
      !response.body &&
      refetchStatuses.includes(response.status)
    )
  }

  return function retryableFetch(
    href: string,
    requestInit?: RequestInit,
  ): Promise<Response> {
    async function retryer(remainRetry: number): Promise<Response> {
      const response = await fetch(href, requestInit)

      if (isRetryable({ response, remainRetry }) === false) {
        return response
      }

      const jitterDelay = Math.random() + 1

      await new Promise((resolve) =>
        setTimeout(resolve, 100 * (Math.pow(2, 3 - remainRetry) + jitterDelay)),
      )

      return retryer(remainRetry - 1)
    }

    return retryer(retryCount)
  }
}

export async function fetcher<T = any, E = HttpErrorResponse>(
  url: string,
  options: RequestOptions,
): Promise<HttpResponse<T, E>> {
  const { retryable, method = HTTPMethods.GET } = options

  const fetchFunction =
    method === HTTPMethods.GET && retryable
      ? makeFetchRetryable({
          fetch,
          retryCount: 3,
        })
      : fetch

  const response: HttpResponse<T, E> = await fetchFunction(
    ...makeRequestParams(url, options),
  )
  const body = await readResponseBody(response)

  if (response.status === 200) {
    response.result = body as T | undefined
  }

  if (!response.ok) {
    response.error = new HttpError(
      new Error(typeof body !== 'string' ? JSON.stringify(body) : body),
      response,
    )
  }

  return response
}
