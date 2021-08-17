import {
  HttpErrorResponse,
  HttpResponse,
  RequestOptions,
} from '@titicaca/fetcher'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

type Fetcher = <Result extends {}, ErrorResponse = HttpErrorResponse>(
  href: string,
  options?: RequestOptions,
) => Promise<HttpResponse<Result, ErrorResponse>>

/**
 * 주어진 fetcher 함수를 SSR 단계에서 작동하도록 변환하는 함수입니다.
 * 다음 기능을 담고 있습니다.
 *
 * * API 요청 경로에 scheme과 host 추가
 * * SSR 요청에 사용하던 options (req, withApiUriBase) 비활성화
 * * 요청에 "x-triple-from-ssr" 헤더 추가
 * * 요청에 cookie 추가
 */
export function ssrFetcherize(
  fetcher: Fetcher,
  {
    apiUriBase,
    cookie,
  }: {
    /**
     * API 요청 경로에 추가하는 scheme과 host 값
     */
    apiUriBase: string
    /**
     * 요청에 첨부하는 쿠키 값
     */
    cookie?: string
  },
): Fetcher {
  const { scheme, host } = parseUrl(apiUriBase)

  return (href, optionsParams) => {
    const {
      req,
      withApiUriBase,
      headers,
      cookie: overridingCookie,
      ...options
    } = optionsParams || {}
    const finalCookie = overridingCookie ?? cookie

    return fetcher(generateUrl({ scheme, host }, href), {
      ...options,
      ...(finalCookie && { cookie: finalCookie }),
      withApiUriBase: false,
      headers: {
        ...headers,
        'x-triple-from-ssr': 'true',
      },
    })
  }
}
