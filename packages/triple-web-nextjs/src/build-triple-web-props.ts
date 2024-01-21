import type { TripleWebProps } from './triple-web'

import { getClientApp, getSession, getUserAgent } from '.'

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
