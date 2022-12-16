import type { IncomingMessage } from 'http'

import { createContext, useContext, PropsWithChildren, useMemo } from 'react'

import { parseTripleClientUserAgent } from './triple-client-user-agent'
import type { App } from './types'

type TripleClientMetadataContextProps = App | null

const TripleClientMetadataContext =
  createContext<TripleClientMetadataContextProps | undefined>(undefined)

export function TripleClientMetadataProvider({
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
    <TripleClientMetadataContext.Provider value={value}>
      {children}
    </TripleClientMetadataContext.Provider>
  )
}

TripleClientMetadataProvider.getInitialProps = async function ({
  req,
}: {
  req?: IncomingMessage
}): Promise<TripleClientMetadataContextProps> {
  const parsedApp = extractTripleClientAppUserAgentFromNextPageContext({ req })

  return parsedApp
}

export function extractTripleClientAppUserAgentFromNextPageContext({
  req,
}: {
  req?: IncomingMessage
}): ReturnType<typeof parseTripleClientUserAgent> {
  const userAgent = req
    ? (req.headers.userAgent as string) || (req.headers['user-agent'] as string)
    : typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined

  return parseTripleClientUserAgent(userAgent || '')
}

export function useTripleClientMetadata() {
  const value = useContext(TripleClientMetadataContext)

  if (value === undefined) {
    throw new Error('TripleClientMetadataProvider is not mounted')
  }

  return value
}
