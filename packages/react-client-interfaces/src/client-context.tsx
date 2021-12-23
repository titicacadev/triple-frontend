import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react'
import { NextPageContext } from 'next'

import { parseClientAppUserAgent } from './client-user-agent'
import type { App } from './types'

type ClientContextProps = App | null

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
    return parsedApp
  }

  return null
}

export function extractClientAppUserAgentFromNextPageContext({
  req,
}: NextPageContext): ReturnType<typeof parseClientAppUserAgent> | null {
  const userAgent = req
    ? (req.headers.userAgent as string)
    : typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined

  return userAgent ? parseClientAppUserAgent(userAgent) : null
}

export function useClientContext() {
  return useContext(ClientContext)
}
