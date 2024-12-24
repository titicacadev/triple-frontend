import { NextPageContext } from 'next'

import type { TripleWebProps } from '../providers/triple-web'

import { getClientApp } from './client-app'
import { getSession } from './session'
import { getUserAgent } from './user-agent'

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
