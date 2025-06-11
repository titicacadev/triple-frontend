/* eslint-disable no-console */
import { GetServerSidePropsContext } from 'next'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { HttpResponse, RequestOptions } from './types'
import {
  captureHttpError,
  handle401Error,
  NEED_REFRESH_IDENTIFIER,
} from './response-handler'

export type BaseFetcher<Extending = unknown> = <
  SuccessBody,
  FailureBody = unknown,
>(
  href: string,
  options?: RequestOptions,
) => Promise<HttpResponse<SuccessBody, FailureBody> | Extending>

export type ExtendFetcher<Fetcher extends BaseFetcher, Extending> = <
  SuccessBody,
  FailureBody = unknown,
>(
  href: string,
  options?: RequestOptions,
) => Promise<
  | HttpResponse<SuccessBody, FailureBody>
  | Exclude<
      ReturnType<Fetcher> extends Promise<infer Resolved> ? Resolved : never,
      HttpResponse<unknown, unknown>
    >
  | Extending
>

/**
 * 주어진 fetcher 함수를 SSR 단계에서 작동하도록 변환하는 함수입니다.
 * 다음 기능을 담고 있습니다.
 *
 * * API 요청 경로에 scheme과 host 추가
 * * SSR 요청에 사용하던 options (req, withApiUriBase) 비활성화
 * * 요청에 "x-triple-from-ssr" 헤더 추가
 * * 요청에 cookie 추가
 */
export function ssrFetcherize<Fetcher extends BaseFetcher>(
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

  return ((href, optionsParams) => {
    const {
      req,
      withApiUriBase,
      headers,
      cookie: overridingCookie,
      ...options
    } = optionsParams || {}
    const finalCookie = overridingCookie ?? cookie

    console.log(
      'ssrFetcherize - generateUrl',
      generateUrl({ scheme, host }, href),
    )
    return fetcher(generateUrl({ scheme, host }, href), {
      ...options,
      ...(finalCookie && { cookie: finalCookie }),
      withApiUriBase: false,
      headers: {
        ...headers,
        'x-triple-from-ssr': 'true',
      },
    })
  }) as Fetcher
}

export const NEED_LOGIN_IDENTIFIER = 'NEED_LOGIN'

/**
 * 주어진 주소가 트리플 도메인인지 확인하는 함수입니다.
 * 호스트가 없거나 환경 변수 값 NEXT_PUBLIC_WEB_URL_BASE의 호스트와 동일하면 트리플 도메인입니다.
 *
 * @param href
 * @returns
 */
function isTripleHref(href: string): boolean {
  const { host } = parseUrl(href)
  const { host: tripleHost } = parseUrl(process.env.NEXT_PUBLIC_WEB_URL_BASE)
  // 클라이언트, 서버 모두에서 유효한 환경 변수가 필요하기 때문에
  // API_URI_BASE 대신 NEXT_PUBLIC_WEB_URL_BASE를 사용합니다.
  return !host || host === tripleHost
}

/**
 * 주어진 fetcher를 세션이 존재할 때만 작동하도록 변환하는 함수
 * 로그인이 필요하면 response 대신 NEED_LOGIN_IDENTIFIER를 반환합니다.
 */
export function authFetcherize<Fetcher extends BaseFetcher>(
  fetcher: Fetcher,
  {
    refresh,
    onCookieRenew,
  }: {
    /**
     * 액세스 토큰이 만료되었을 때 작동하는 함수입니다.
     * 리프레시 토큰으로 액세스 토큰을 갱신하는 API 요청 함수를 넣어주세요.
     */
    refresh: (
      options?: Pick<RequestInit, 'signal'>,
    ) => Promise<HttpResponse<Record<string, never>>>
    /**
     * 액세스 토큰을 갱신했을 때 새로운 쿠키를 파라미터로 호출하는 함수입니다.
     * 새로운 쿠키를 다루는 작업이 필요하면 넣어주세요.
     */
    onCookieRenew?: (cookie: string) => void
  },
): ExtendFetcher<Fetcher, typeof NEED_LOGIN_IDENTIFIER> {
  return (async <SuccessBody, FailureBody = unknown>(
    href: string,
    options?: RequestOptions,
  ) => {
    const firstTrialResponse = await fetcher<SuccessBody, FailureBody>(
      href,
      options,
    )

    if (isTripleHref(href) === false) {
      return firstTrialResponse
    }

    if (
      typeof firstTrialResponse !== 'object' ||
      firstTrialResponse === null ||
      'status' in firstTrialResponse === false
    ) {
      // fetcher가 확장된 응답을 반환했을 때
      // TODO: 좀 더 분명한 구분 방법으로 대체하기
      return firstTrialResponse
    }

    const checkFirstTrialResponse = await handle401Error<
      SuccessBody,
      FailureBody
    >(firstTrialResponse as HttpResponse<SuccessBody, FailureBody>)
    if (checkFirstTrialResponse !== NEED_REFRESH_IDENTIFIER) {
      return checkFirstTrialResponse === NEED_LOGIN_IDENTIFIER
        ? NEED_LOGIN_IDENTIFIER
        : firstTrialResponse
    }

    const refreshResponse = await refresh({
      signal: options?.signal,
      ...(options?.withApiUriBase && {
        withApiUriBase: options.withApiUriBase,
      }),
    })

    if (refreshResponse.ok === false) {
      if (refreshResponse.status === 400 || refreshResponse.status === 401) {
        captureHttpError(refreshResponse)
        return NEED_LOGIN_IDENTIFIER
      }

      throw new Error(`${refreshResponse.status} - ${refreshResponse.url}`)
    }

    const newCookie = refreshResponse.headers.get('set-cookie')

    const secondTrialResponse = await fetcher<SuccessBody, FailureBody>(href, {
      ...options,
      cookie: newCookie ?? undefined,
    })

    if (newCookie && onCookieRenew !== undefined) {
      onCookieRenew(newCookie)
    }

    return secondTrialResponse
  }) as unknown as ExtendFetcher<Fetcher, typeof NEED_LOGIN_IDENTIFIER>
}

export function i18nFetcherize<Fetcher extends BaseFetcher>(
  fetcher: Fetcher,
  ctx: GetServerSidePropsContext,
): Fetcher {
  const {
    req: { headers },
  } = ctx
  const langHeader = (headers['x-triple-user-lang'] ?? 'ko') as string
  const countryHeader = (headers['x-triple-user-country'] ?? 'kr') as string

  return ((href, optionsParams) => {
    const { headers, ...options } = optionsParams ?? {}

    return fetcher(href, {
      ...options,
      headers: {
        ...headers,
        'x-triple-user-lang': langHeader,
        'x-triple-user-country': countryHeader,
      },
    })
  }) as Fetcher
}
