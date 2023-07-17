import type { IncomingMessage } from 'http'

import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react'

import { parseTripleClientUserAgent } from './triple-client-user-agent'
import type { App } from './types'

type TripleClientMetadataContextProps = App | null

const TripleClientMetadataContext = createContext<
  TripleClientMetadataContextProps | undefined
>(undefined)

export function TripleClientMetadataProvider({
  appName,
  appVersion,
  shouldUpdateUserAgentOnMount,
  children,
}: PropsWithChildren<
  Partial<App> & { shouldUpdateUserAgentOnMount?: boolean }
>) {
  const initialApp: App | null =
    appName && appVersion
      ? {
          appName,
          appVersion,
        }
      : null

  const [app, setApp] = useState<App | null>(initialApp)

  useEffect(() => {
    if (shouldUpdateUserAgentOnMount) {
      setApp(extractTripleClientAppUserAgentFromNextPageContext({}))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TripleClientMetadataContext.Provider value={app}>
      {children}
    </TripleClientMetadataContext.Provider>
  )
}

/** 
  next v13 app router를 사용하는 경우 '@titicaca/react-triple-client-interfaces/server'의 getTripleClientMetadata를 사용하세요.
*/
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
