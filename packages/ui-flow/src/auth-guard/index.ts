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
  returnUrl: string,
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
    } = ctx

    if (userAgentString && !!parseApp(userAgentString)) {
      return gssp(ctx)
    }

    const { result: user } = await get<UserResponse>('/api/users/me', {
      req,
      retryable: true,
    })

    if (user) {
      return gssp({ ...ctx, customContext: { ...ctx.customContext, user } })
    }

    return {
      redirect: {
        destination: `/login?returnUrl=${encodeURIComponent(returnUrl)}`,
        basePath: false,
        permanent: false,
      },
    }
  }
}
