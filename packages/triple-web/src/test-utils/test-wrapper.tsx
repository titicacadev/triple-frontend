import { PropsWithChildren } from 'react'

import { ClientAppContext } from '../client-app/context'
import { EnvContext } from '../env/context'
import { I18nProvider } from '../i18n/context'
import { SessionProvider } from '../session/context'
import { UserAgentContext } from '../user-agent/context'
import { HashRouterProvider } from '../hash-router/context'
import { ModalProvider } from '../modal/context'
import type { ClientAppValue } from '../client-app/types'
import type { EnvValue } from '../env/types'
import type { SessionValue } from '../session/types'
import type { UserAgentValue } from '../user-agent/types'

import i18n from './i18n'

interface TestWrapperProps {
  clientAppProvider?: ClientAppValue
  envProvider?: EnvValue
  sessionProvider?: SessionValue
  userAgentProvider?: UserAgentValue
}

export function TestWrapper({
  clientAppProvider,
  envProvider,
  sessionProvider,
  userAgentProvider,
}: TestWrapperProps) {
  // eslint-disable-next-line react/display-name
  return ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider value={clientAppProvider}>
      <EnvContext.Provider value={envProvider}>
        <I18nProvider i18n={i18n} lang={undefined}>
          <SessionProvider initialSession={sessionProvider ?? { user: null }}>
            <UserAgentContext.Provider value={userAgentProvider}>
              <HashRouterProvider>
                <ModalProvider>{children}</ModalProvider>
              </HashRouterProvider>
            </UserAgentContext.Provider>
          </SessionProvider>
        </I18nProvider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
