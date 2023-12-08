import { TripleWebProps } from '@titicaca/triple-web'
import { NextPageContext } from 'next'

import { getClientApp, getSession, getUserAgent } from './providers'

export async function buildTripleWebProps(
  ctx: NextPageContext,
): Promise<Omit<TripleWebProps, 'children' | 'envProvider' | 'i18nProvider'>> {
  return {
    clientAppProvider: getClientApp(ctx),
    sessionProvider: await getSession(ctx),
    userAgentProvider: getUserAgent(ctx),
  }
}
