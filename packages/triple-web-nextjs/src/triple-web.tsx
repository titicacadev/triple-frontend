'use client'

import {
  TripleWeb as TripleWebBase,
  type TripleWebProps as TripleWebBaseProps,
  type I18nValue,
} from '@titicaca/triple-web'

import { useLang } from './hooks'

export interface TripleWebProps
  extends Omit<TripleWebBaseProps, 'i18nProvider'> {
  i18nProvider: Omit<I18nValue, 'lang'> & { key?: string; fallback: string }
}

export async function TripleWeb({
  children,
  clientAppProvider,
  envProvider,
  i18nProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  const lang = useLang(i18nProvider.fallback, i18nProvider.key)

  return (
    <TripleWebBase
      clientAppProvider={clientAppProvider}
      envProvider={envProvider}
      i18nProvider={{ i18n: i18nProvider.i18n, lang }}
      sessionProvider={sessionProvider}
      userAgentProvider={userAgentProvider}
    >
      {children}
    </TripleWebBase>
  )
}
