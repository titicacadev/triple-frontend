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
  i18nProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <TripleWebBase
      clientAppProvider={clientAppProvider}
      envProvider={envProvider}
      i18nProvider={i18nProvider}
      sessionProvider={sessionProvider}
      userAgentProvider={userAgentProvider}
    >
      {children}
    </TripleWebBase>
  )
}
