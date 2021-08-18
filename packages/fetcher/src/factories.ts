import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { HttpErrorResponse, HttpResponse, RequestOptions } from './types'

type ExtendedFetcher<ExtendingResponse = never> = <
  Result extends {},
  ErrorResponse = HttpErrorResponse
>(
  href: string,
  options?: RequestOptions,
) => Promise<HttpResponse<Result, ErrorResponse> | ExtendingResponse>

/**
 * 주어진 fetcher 함수를 SSR 단계에서 작동하도록 변환하는 함수입니다.
 * 다음 기능을 담고 있습니다.
 *
 * * API 요청 경로에 scheme과 host 추가
 * * SSR 요청에 사용하던 options (req, withApiUriBase) 비활성화
 * * 요청에 "x-triple-from-ssr" 헤더 추가
 * * 요청에 cookie 추가
 */
export function ssrFetcherize<ExtendingResponse = never>(
  fetcher: ExtendedFetcher<ExtendingResponse>,
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
): ExtendedFetcher<ExtendingResponse> {
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

/**
 * 주어진 fetcher를 세션이 존재할 때만 작동하도록 변환하는 함수
 * 로그인이 필요하면 response 대신 "NEED_LOGIN" 문자열을 반환합니다.
 */
export function authFetcherize<ExtendingResponse = never>(
  fetcher: ExtendedFetcher<ExtendingResponse>,
  {
    refresh,
    handleNewCookie,
  }: {
    /**
     * 액세스 토큰이 만료되었을 때 작동하는 함수입니다.
     * 리프레시 토큰으로 액세스 토큰을 갱신하는 API 요청 함수를 넣어주세요.
     */
    refresh: () => Promise<HttpResponse<{}>>
    /**
     * 액세스 토큰을 갱신했을 때 새로운 쿠키를 파라미터로 호출하는 함수입니다.
     * 새로운 쿠키로 다루는 작업이 필요하면 넣어주세요.
     */
    handleNewCookie?: (cookie: string) => void
  },
): ExtendedFetcher<ExtendingResponse | 'NEED_LOGIN'> {
  return async <Result extends {}, ErrorResponse = HttpErrorResponse>(
    href: string,
    options?: RequestOptions,
  ): Promise<
    HttpResponse<Result, ErrorResponse> | ExtendingResponse | 'NEED_LOGIN'
  > => {
    const firstTrialResponse = await fetcher<Result, ErrorResponse>(
      href,
      options,
    )

    if (!('status' in firstTrialResponse)) {
      return firstTrialResponse
    }

    if (firstTrialResponse.status !== 401) {
      return firstTrialResponse
    }

    const refreshResponse = await refresh()

    if (refreshResponse.ok === false) {
      if (refreshResponse.status === 400 || refreshResponse.status === 401) {
        return 'NEED_LOGIN'
      }

      throw (
        refreshResponse.error ||
        new Error('액세스 토큰 갱신 중 오류가 발생했습니다.')
      )
    }

    const newCookie = refreshResponse.headers.get('set-cookie')

    const secondTrialResponse = await fetcher<Result, ErrorResponse>(href, {
      ...options,
      req: { headers: { cookie: newCookie } } as any,
      headers: { ...options?.headers, ...(newCookie && { cookie: newCookie }) },
    })

    if (newCookie && handleNewCookie !== undefined) {
      handleNewCookie(newCookie)
    }

    return secondTrialResponse
  }
}
