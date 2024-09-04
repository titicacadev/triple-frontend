'use client'

import {
  TripleWeb as TripleWebBase,
  type TripleWebProps as TripleWebBaseProps,
} from '@titicaca/triple-web'

export type TripleWebProps = TripleWebBaseProps

export async function TripleWeb({
  children,
  clientAppProvider,
  envProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <TripleWebBase
      clientAppProvider={clientAppProvider}
      envProvider={envProvider}
      sessionProvider={sessionProvider}
      userAgentProvider={userAgentProvider}
    >
      {children}
    </TripleWebBase>
  )
}
