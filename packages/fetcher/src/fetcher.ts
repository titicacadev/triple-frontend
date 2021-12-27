import { makeRequestParams } from './make-request-params'
import safeParseJson from './safe-parse-json'
import { HTTPMethods, HttpResponse, RequestOptions } from './types'

export async function fetcher<SuccessBody, FailureBody = unknown>(
  url: string,
  options: RequestOptions,
): Promise<HttpResponse<SuccessBody, FailureBody>> {
  const { retryable, method = HTTPMethods.GET } = options

  const fetchFunction =
    method === HTTPMethods.GET && retryable
      ? makeFetchRetryable({
          fetch,
          retryCount: 3,
        })
      : fetch

  const response = await fetchFunction(...makeRequestParams(url, options))
  const body = await readResponseBody(response)
  const restResponse = pickUsableProperties(response)

  if (response.ok === true) {
    return {
      ...restResponse,
      ok: true,
      parsedBody: body as SuccessBody,
    }
  }

  return {
    ...restResponse,
    ok: false,
    parsedBody: body as FailureBody,
  }
}

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
    return remainRetry > 0 && refetchStatuses.includes(response.status)
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

function readResponseBody(response: Response) {
  const contentType = response.headers.get('content-type')
  const jsonParseAvailable = contentType && /json/.test(contentType)

  if (jsonParseAvailable) {
    return safeParseJson(response)
  }

  return response.text()
}

function pickUsableProperties({ headers, ok, status, url }: Response) {
  return { headers, ok, status, url }
}
