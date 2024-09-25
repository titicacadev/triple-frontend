'use client'

import { PropsWithChildren } from 'react'

import { ClientAppContext } from '../client-app/context'
import { EnvContext } from '../env/context'
import { I18nContext } from '../i18n/context'
import { SessionProvider } from '../session/context'
import { UserAgentContext } from '../user-agent/context'
import { HashRouterProvider } from '../hash-router/context'
import { ModalProvider } from '../modal/context'
import type { ClientAppValue } from '../client-app/types'
import type { EnvValue } from '../env/types'
import type { I18nValue } from '../i18n/types'
import type { SessionValue } from '../session/types'
import type { UserAgentValue } from '../user-agent/types'
import { LoginCtaModal } from '../modal/components/login-cta-modal'
import { AppInstallCtaModal } from '../modal/components/app-install-cta-modal'

export interface TripleWebProps extends PropsWithChildren {
  clientAppProvider: ClientAppValue
  envProvider: EnvValue
  i18nProvider: I18nValue
  sessionProvider: SessionValue
  userAgentProvider: UserAgentValue
}

export function TripleWeb({
  children,
  clientAppProvider,
  envProvider,
  i18nProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <ClientAppContext.Provider value={clientAppProvider}>
      <EnvContext.Provider value={envProvider}>
        <I18nContext.Provider value={i18nProvider}>
          <SessionProvider initialSession={sessionProvider}>
            <UserAgentContext.Provider value={userAgentProvider}>
              <HashRouterProvider>
                <ModalProvider>
                  {children}
                  <LoginCtaModal />
                  <AppInstallCtaModal />
                </ModalProvider>
              </HashRouterProvider>
            </UserAgentContext.Provider>
          </SessionProvider>
        </I18nContext.Provider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
