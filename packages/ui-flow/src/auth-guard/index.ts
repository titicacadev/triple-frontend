import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { get } from '@titicaca/fetcher'
import { parseApp } from '@titicaca/react-contexts'
import qs from 'qs'
import { generateUrl, parseUrl, strictQuery } from '@titicaca/view-utilities'

interface UserResponse {
  uid: string
  // TODO
}

type AuthGuardOptions = {
  authType?: string
  allowNonMembers?: boolean
  resolveReturnUrl?: (
    ctx: GetServerSidePropsContext & {
      customContext?: { [key: string]: unknown }
    },
  ) => string
}

const NON_MEMBER_REGEX = /^_PH/

export function authGuard<Props>(
  gssp: (
    ctx: GetServerSidePropsContext & {
      customContext?: { user?: UserResponse }
    },
  ) => Promise<GetServerSidePropsResult<Props>>,
  options?: AuthGuardOptions,
): (
  ctx: GetServerSidePropsContext & {
    customContext?: { [key: string]: unknown }
  },
) => Promise<GetServerSidePropsResult<Props>> {
  return async (ctx) => {
    const {
      req,
      req: {
        headers: { 'user-agent': userAgentString },
      },
      resolvedUrl,
    } = ctx

    const returnUrl = options?.resolveReturnUrl
      ? options.resolveReturnUrl(ctx)
      : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${resolvedUrl}`

    const { result: user, status, error } = await get<UserResponse>(
      '/api/users/me',
      {
        req,
        retryable: true,
      },
    )

    const isNonMember = user && user.uid.match(NON_MEMBER_REGEX)

    if (
      (options?.allowNonMembers && user) ||
      (!options?.allowNonMembers && user && !isNonMember)
    ) {
      return gssp({ ...ctx, customContext: { ...ctx.customContext, user } })
    }

    if (status === 401 || isNonMember) {
      if (userAgentString && parseApp(userAgentString) && status === 401) {
        const { query: currentQuery } = parseUrl(resolvedUrl)
        const { refreshed, attemptedLogin } = strictQuery(
          currentQuery ? qs.parse(currentQuery) : ({} as any),
        )
          .boolean('refreshed')
          .boolean('attemptedLogin')
          .use()

        if (refreshed && !attemptedLogin) {
          const loginReturnUrl = generateUrl(
            { query: qs.stringify({ attemptedLogin: true }) },
            returnUrl,
          )

          return {
            redirect: {
              destination: `${
                process.env.NEXT_PUBLIC_APP_SCHEME
              }:///login?returnUrl=${encodeURIComponent(loginReturnUrl)}`,
              basePath: false,
              permanent: false,
            },
          }
        }

        const destinationQuery = qs.stringify({
          returnUrl: generateUrl({ query: 'refreshed=true' }, returnUrl),
        })

        return {
          redirect: {
            destination: `/landing/refresh?${destinationQuery}`,
            basePath: false,
            permanent: false,
          },
        }
      }

      const query = qs.stringify({
        returnUrl,
        type: options?.authType,
      })

      return {
        redirect: {
          destination: `/login?${query}`,
          basePath: false,
          permanent: false,
        },
      }
    }

    throw error || new Error('Fail to check auth')
  }
}
