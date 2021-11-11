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

    const { ok, result: user, status, error } = await get<UserResponse>(
      '/api/users/me',
      {
        req,
        retryable: true,
      },
    )

    if (ok === false) {
      if (status === 401) {
        if (userAgentString && parseApp(userAgentString)) {
          return refreshInAppSession({ resolvedUrl, returnUrl })
        }

        return redirectToLogin({ returnUrl, authType: options?.authType })
      }

      throw new Error(`Fail to fetch User: ${status}`)
    }

    if (user === undefined) {
      throw new Error('Fail to check auth')
    }

    const isNonMember = user.uid.match(NON_MEMBER_REGEX)

    if (
      options?.allowNonMembers ||
      (!options?.allowNonMembers && !isNonMember)
    ) {
      return gssp({ ...ctx, customContext: { ...ctx.customContext, user } })
    }

    if (isNonMember) {
      return redirectToLogin({ returnUrl, authType: options?.authType })
    }

    throw error || new Error('Fail to check auth')
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
  const { refreshed } = strictQuery(query ? qs.parse(query) : ({} as any))
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
