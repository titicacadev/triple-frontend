import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { authGuardedFetchers, NEED_LOGIN_IDENTIFIER } from '@titicaca/fetcher'
import qs from 'qs'
import { generateUrl, parseUrl, strictQuery } from '@titicaca/view-utilities'
import { checkClientApp } from '@titicaca/triple-web-utils'
import { SessionUser } from '@titicaca/triple-web'

import { getSessionAvailability } from './get-session-availability'

interface AuthGuardOptions {
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
      customContext?: { user?: SessionUser }
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

    const response = await authGuardedFetchers.get<SessionUser>(
      '/api/users/me',
      {
        req,
        retryable: true,
      },
    )

    if (response === NEED_LOGIN_IDENTIFIER) {
      if (
        // TODO : WEB, APP 구분 제거
        userAgentString &&
        checkClientApp(userAgentString) &&
        getSessionAvailability(ctx)
      ) {
        return refreshInAppSession({ resolvedUrl, returnUrl })
      }

      return redirectToLogin({ returnUrl, authType: options?.authType })
    } else if (!response.ok) {
      const { status } = response

      throw new Error(`Fail to fetch User: ${status}`)
    } else {
      const { parsedBody: user } = response

      const isNonMember = user.uid.match(NON_MEMBER_REGEX)

      if (!options?.allowNonMembers && isNonMember) {
        return redirectToLogin({ returnUrl, authType: options?.authType })
      }

      return gssp({ ...ctx, customContext: { ...ctx.customContext, user } })
    }
  }
}

function refreshInAppSession({
  resolvedUrl,
  returnUrl,
}: {
  resolvedUrl: string
  returnUrl: string
}) {
  const { query } = parseUrl(resolvedUrl)
  const { refreshed } = strictQuery(
    query
      ? (qs.parse(query) as Record<string, string | string[] | undefined>)
      : {},
  )
    .boolean('refreshed')
    .use()

  if (refreshed) {
    throw new Error('세션 갱신에 실패했습니다.')
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
  } as const
}

function redirectToLogin({
  returnUrl,
  authType,
}: {
  returnUrl: string
  authType?: string
}) {
  const query = qs.stringify({
    returnUrl,
    type: authType,
  })

  return {
    redirect: {
      destination: `/login?${query}`,
      basePath: false,
      permanent: false,
    },
  } as const
}
