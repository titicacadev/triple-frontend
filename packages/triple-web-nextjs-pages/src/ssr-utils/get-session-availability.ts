import { checkSession } from '@titicaca/triple-web'
import type { GetServerSidePropsContext } from 'next'

export function getSessionAvailability(
  ctx: GetServerSidePropsContext,
): boolean {
  return checkSession(ctx.req.headers.cookie)
}
