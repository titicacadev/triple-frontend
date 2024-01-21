import { NextPageContext } from 'next'

import type { TripleWebProps } from './triple-web'
import { getClientApp, getSession, getUserAgent } from './providers'

export type BuildTripleWebPropsResult = Omit<
  TripleWebProps,
  'children' | 'envProvider' | 'i18nProvider'
>

export async function buildTripleWebProps(
  ctx: NextPageContext,
): Promise<BuildTripleWebPropsResult> {
  return {
    clientAppProvider: getClientApp(ctx),
    sessionProvider: await getSession(ctx),
    userAgentProvider: getUserAgent(ctx),
  }
}
