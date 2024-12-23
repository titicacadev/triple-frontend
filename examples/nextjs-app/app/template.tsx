import { buildTripleWebProps, TripleWeb } from '@titicaca/triple-web-nextjs'
import { PropsWithChildren } from 'react'

export default async function Template({ children }: PropsWithChildren) {
  const { clientAppProvider, sessionProvider, userAgentProvider } =
    await buildTripleWebProps()

  return (
    <TripleWeb
      clientAppProvider={clientAppProvider}
      envProvider={{
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
        appUrlScheme: '',
        basePath: '/',
        defaultPageDescription: '',
        defaultPageTitle: '',
        facebookAppId: '',
        webUrlBase: '',
      }}
      i18nProvider={{ defaultLocale: 'ko' }}
      sessionProvider={sessionProvider}
      userAgentProvider={userAgentProvider}
    >
      {children}
    </TripleWeb>
  )
}
