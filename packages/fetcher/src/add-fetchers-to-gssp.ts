/* eslint-disable no-console */
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import {
  authFetcherize,
  BaseFetcher,
  ExtendFetcher,
  NEED_LOGIN_IDENTIFIER,
  ssrFetcherize,
  i18nFetcherize,
} from './factories'
import { del, get, post, put } from './methods'
import { RequestOptions, HttpResponse } from './types'

/**
 * 주어진 getServerSideProps 함수의 context에 fetcher를 추가하는 팩토리 함수
 * @param gssp
 * @param options 추가 옵션
 * @returns getServerSideProps로 전달할 수 있는 함수
 */
export function addFetchersToGssp<Props, CustomContext = Record<string, never>>(
  gssp: (
    ctx: GetServerSidePropsContext & {
      customContext: {
        fetchers: {
          get: ExtendFetcher<typeof get, typeof NEED_LOGIN_IDENTIFIER>
          post: ExtendFetcher<typeof post, typeof NEED_LOGIN_IDENTIFIER>
          put: ExtendFetcher<typeof put, typeof NEED_LOGIN_IDENTIFIER>
          del: ExtendFetcher<typeof del, typeof NEED_LOGIN_IDENTIFIER>
        }
      }
    },
  ) => Promise<GetServerSidePropsResult<Props>>,
  { apiUriBase: apiUriBaseFromOptions }: { apiUriBase?: string } = {},
): (
  ctx: GetServerSidePropsContext & { customContext?: CustomContext },
) => Promise<GetServerSidePropsResult<Props>> {
  const apiUriBase = apiUriBaseFromOptions || process.env.API_URI_BASE

  if (!apiUriBase) {
    throw new Error(
      'API 요청 URL을 알 수 없습니다. apiUriBase 옵션을 추가하거나 API_URI_BASE 환경 변수를 추가하세요.',
    )
  }

  return function fetchersAddedGssp(ctx) {
    const ssrFetcherOptions = {
      apiUriBase,
      cookie: ctx.req.headers.cookie,
    }

    console.log('addFetchersToGssp', ctx)
    console.log('ctx.req.headers.cookie', ctx.req.headers.cookie)

    const { setCookie, cookieOverrider } = createCookieOverrider()

    const authGuardOptions: Parameters<typeof authFetcherize>[1] = {
      refresh: createRefresh({ ssrFetcherOptions }),
      onCookieRenew: (cookie: string) => {
        ctx.res.setHeader('set-cookie', cookie)
        setCookie(cookie)
      },
    }

    const combinedMiddlewares = <Fetcher extends BaseFetcher>(
      fetcher: Fetcher,
    ) =>
      cookieOverrider(
        authFetcherize(
          ssrFetcherize(i18nFetcherize(fetcher, ctx), ssrFetcherOptions),
          authGuardOptions,
        ),
      )

    return gssp({
      ...ctx,
      customContext: {
        ...ctx.customContext,
        fetchers: {
          get: combinedMiddlewares(get),
          put: combinedMiddlewares(put),
          post: combinedMiddlewares(post),
          del: combinedMiddlewares(del),
        },
      },
    })
  }
}

function createRefresh({
  ssrFetcherOptions,
}: {
  ssrFetcherOptions: Parameters<typeof ssrFetcherize>[1]
}) {
  let promise: Promise<HttpResponse<Record<string, never>>> | undefined
  return function refresh(options?: RequestOptions) {
    const ssrPost = ssrFetcherize(post, ssrFetcherOptions)
    promise ||= ssrPost('/api/users/web-session/token', options)
    return promise
  }
}

function createCookieOverrider() {
  let cookie: string | undefined

  function cookieOverrider<Fetcher extends BaseFetcher>(fetcher: Fetcher) {
    return function cookieOverridingFetcher(href, options) {
      if (cookie === undefined) {
        return fetcher(href, options)
      }

      return fetcher(href, { ...options, cookie })
    } as Fetcher
  }

  return {
    cookieOverrider,
    setCookie: (newCookie: string) => {
      cookie = newCookie
    },
  }
}
