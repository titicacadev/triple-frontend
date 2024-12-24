import type { TripleWebProps } from '../providers'

import { getClientApp } from './client-app'
import { getSession } from './session'
import { getUserAgent } from './user-agent'

export type BuildTripleWebPropsResult = Omit<
  TripleWebProps,
  'children' | 'envProvider' | 'i18nProvider'
>

export async function buildTripleWebProps(): Promise<BuildTripleWebPropsResult> {
  return {
    clientAppProvider: getClientApp(),
    sessionProvider: await getSession(),
    userAgentProvider: getUserAgent(),
  }
}
