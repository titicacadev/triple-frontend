import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import {
  authFetcherize,
  BaseFetcher,
  ExtendFetcher,
  NEED_LOGIN_IDENTIFIER,
  ssrFetcherize,
} from './factories'
import { del, get, post, put } from './methods'
import { HttpResponse } from './types'

/**
 * 주어진 getServerSideProps 함수의 context에 fetcher를 추가하는 팩토리 함수
 * @param gssp
 * @param options 추가 옵션
 * @returns getServerSideProps로 전달할 수 있는 함수
 */
export function addFetchersToGSSP<Props, CustomContext = {}>(
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

  return async function fetchersAddedGSSP(ctx) {
    const ssrFetcherOptions = {
      apiUriBase,
      cookie: ctx.req.headers.cookie,
    }
    const ssrPost = ssrFetcherize(post, ssrFetcherOptions)
    let promise: Promise<HttpResponse<{}>>
    const authGuardOptions: Parameters<typeof authFetcherize>[1] = {
      refresh: (options) => {
        if (promise !== undefined) {
          return promise
        }
        promise = ssrPost('/api/users/web-session/token', options)
        return promise
      },
      onCookieRenew: (cookie: string) => {
        ctx.res.setHeader('set-cookie', cookie)
      },
    }

    const combinedMiddlewars = <Fetcher extends BaseFetcher>(
      fetcher: Fetcher,
    ) =>
      authFetcherize(
        ssrFetcherize(fetcher, ssrFetcherOptions),
        authGuardOptions,
      )

    return gssp({
      ...ctx,
      customContext: {
        ...ctx.customContext,
        fetchers: {
          get: combinedMiddlewars(get),
          put: combinedMiddlewars(put),
          post: combinedMiddlewars(post),
          del: combinedMiddlewars(del),
        },
      },
    })
  }
}
