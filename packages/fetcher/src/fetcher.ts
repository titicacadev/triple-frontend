import { HttpError } from './error'
import { makeRequestParams } from './make-request-params'
import safeParseJSON from './safe-parse-json'
import {
  HttpErrorResponse,
  HTTPMethods,
  HttpResponse,
  RequestOptions,
} from './types'

const refetchStatuses = [502, 503, 504]

export async function fetcher<T = any, E = HttpErrorResponse>(
  url: string,
  options: RequestOptions,
): Promise<HttpResponse<T, E>> {
  const { retryable, method } = options

  const getResponse: (retry: number) => Promise<HttpResponse<T, E>> = async (
    retry: number,
  ) => {
    const response: HttpResponse<T, E> = await fetch(
      ...makeRequestParams(url, options),
    )

    if (
      response.body ||
      method !== HTTPMethods.GET ||
      retry <= 0 ||
      !refetchStatuses.includes(response.status)
    ) {
      return response
    }

    const jitterDelay = Math.random() + 1

    await new Promise((resolve) =>
      setTimeout(resolve, 100 * (Math.pow(2, 3 - retry) + jitterDelay)),
    )

    return getResponse(retry - 1)
  }

  const response = await getResponse(retryable ? 3 : 0)

  try {
    const responseContentType = response.headers.get('content-type')

    /**
     * TODO:
     * - [ ] 서버에서 모든 에러 포맷이 json 이 보장되거나 status 코드로만 처리할 수 있도록 한다.
     * - 현재 string like boolean | undefined | json string 이 2xx, 4xx 에서 혼용되고 있다.
     */
    if (
      response.status === 200 &&
      responseContentType &&
      /json/.test(responseContentType)
    ) {
      response.result = await safeParseJSON(response)
    }

    if (!response.ok || response.status >= 400) {
      throw new Error(await response.text())
    }

    return response
  } catch (error) {
    response.error = new HttpError(error, response)

    // captureException()

    /**
     * TODO: 공통 에러처리
     * idea1: 에러 객체를 response.error 에 던져주고 before/after hook 이나 middleware 형태로
     * fetcher 에서는 로깅 관련 로직을 분리해서 sentry logging 을 할 수 있도록 한다.
     *
     * idea2: custom error class 를 만들어서 해당 클래스에서 공통 처리 로직을 갖는다.
     * 현재는 API 호출중에 에러가 발생하면 그냥 sentry 로깅!
     *
     * class HttpError {
     *   constructor (status, statusText) {}
     *
     *   action () {}
     * }
     *
     * 비지니스 로직단에서 에러 로직이 필요한 경우에는 아래와 같이 통일된 형태로 에러 객체를 전달하여 처리
     * const { result, error } = fetchSomething(...args)
     */
    return response
  }
}
