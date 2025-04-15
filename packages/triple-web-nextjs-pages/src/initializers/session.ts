import type { NextPageContext } from 'next'
import { fetchUser, type SessionValue } from '@titicaca/triple-web'

/**
 * @returns
 */
export async function getSession(ctx: NextPageContext): Promise<SessionValue> {
  const user = await fetchUser({ cookie: ctx.req?.headers.cookie })

  return {
    user,
  }
}
