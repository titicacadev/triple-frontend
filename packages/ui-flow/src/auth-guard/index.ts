import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { get } from '@titicaca/fetcher'
import { parseApp } from '@titicaca/react-contexts'

interface UserResponse {
  uid: string
  // TODO
}

export function authGuard<Props extends { [key: string]: unknown }>(
  gssp: (
    ctx: GetServerSidePropsContext & {
      customContext?: { user?: UserResponse }
    },
  ) => Promise<GetServerSidePropsResult<Props>>,
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
      return {
        redirect: {
          destination: `/login?returnUrl=${encodeURIComponent(returnUrl)}`,
          basePath: false,
          permanent: false,
        },
      }
    }

    throw error || new Error('Fail to check auth')
  }
}
