import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { get } from '@titicaca/fetcher'

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

    // TODO: react-contexts의 user-agent-context와 중복 제거
    if (userAgentString?.match(/Triple-(iOS|Android)\/([^ ]+)/i)) {
      return gssp(ctx)
    }

    const { result: user } = await get<UserResponse>('/api/users/me', { req })

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
