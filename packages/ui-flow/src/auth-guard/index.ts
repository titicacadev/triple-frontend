import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { get } from '@titicaca/fetcher'
import { parseApp } from '@titicaca/react-contexts'
import qs from 'qs'

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

    if (userAgentString && !!parseApp(userAgentString)) {
      return gssp(ctx)
    }

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
