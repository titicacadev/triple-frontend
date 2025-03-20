import type { GetServerSidePropsContext } from 'next'

import { checkSession } from '../helpers/session'

export function getSessionAvailability(
  ctx: GetServerSidePropsContext,
): boolean {
  return checkSession(ctx.req)
}
