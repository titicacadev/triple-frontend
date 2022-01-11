import type { IncomingMessage } from 'http'

import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react'

import { parseNativeClientUserAgent } from './client-user-agent'
import type { App } from './types'

type ClientContextProps = App | null

const ClientContext = createContext<ClientContextProps | undefined>(undefined)

export function ClientContextProvider({
  appName,
  appVersion,
  children,
}: PropsWithChildren<Partial<App>>) {
  const value: App | null = useMemo(
    () =>
      appName && appVersion
        ? {
            appName,
            appVersion,
          }
        : null,
    [appName, appVersion],
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}

ClientContextProvider.getInitialProps = async function ({
  req,
}: {
  req?: IncomingMessage
}): Promise<ClientContextProps> {
  const parsedApp = extractClientAppUserAgentFromNextPageContext({ req })

  return parsedApp
}

export function extractClientAppUserAgentFromNextPageContext({
  req,
}: {
  req?: IncomingMessage
}): ReturnType<typeof parseNativeClientUserAgent> {
  const userAgent = req
    ? (req.headers.userAgent as string) || (req.headers['user-agent'] as string)
    : typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined

  return parseNativeClientUserAgent(userAgent || '')
}

export function useClientContext() {
  const value = useContext(ClientContext)

  if (value === undefined) {
    throw new Error('ClientContextProvider is not mounted')
  }

  return value
}
