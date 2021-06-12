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
}

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

    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${resolvedUrl}`

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

    if (user) {
      return gssp({ ...ctx, customContext: { ...ctx.customContext, user } })
    }

    if (status === 401) {
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
