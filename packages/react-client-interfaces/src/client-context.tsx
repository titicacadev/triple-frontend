import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react'
import { NextPageContext } from 'next'
import { parseAppUserAgent, AppName } from '@titicaca/view-utilities'

type ClientContextProps = {
  appName?: AppName
  appVersion?: string
}

const ClientContext = createContext<ClientContextProps | null>(null)

export function ClientContextProvider({
  appName,
  appVersion,
  children,
}: React.PropsWithChildren<ClientContextProps>) {
  const value = useMemo(
    () => ({
      appName,
      appVersion,
    }),
    [appName, appVersion],
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}

ClientContextProvider.getInitialProps = async function (
  nextPageContext: NextPageContext,
): Promise<ClientContextProps> {
  const parsedApp = extractClientAppUserAgentFromNextPageContext(
    nextPageContext,
  )

  if (parsedApp) {
    return {
      appName: parsedApp.name,
      appVersion: parsedApp.version,
    }
  }

  return {}
}

export function extractClientAppUserAgentFromNextPageContext({
  req,
}: NextPageContext): ReturnType<typeof parseAppUserAgent> | null {
  const userAgent = req
    ? (req.headers.userAgent as string)
    : typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined

  return userAgent ? parseAppUserAgent(userAgent) : null
}

export function useClientContext() {
  return useContext(ClientContext)
}
