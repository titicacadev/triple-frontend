import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react'
import { NextPageContext } from 'next'
import { parseApp } from '@titicaca/view-utilities'

type ClientContextProps = {
  appVersion?: string
}

const ClientContext = createContext<ClientContextProps | null>(null)

export function ClientContextProvider({
  appVersion,
  children,
}: React.PropsWithChildren<ClientContextProps>) {
  const value = useMemo(
    () => ({
      appVersion,
    }),
    [appVersion],
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}

ClientContextProvider.getInitialProps = async function ({
  req,
}: NextPageContext): Promise<ClientContextProps> {
  const userAgent = req
    ? (req.headers.userAgent as string)
    : typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined

  if (userAgent) {
    const parsedApp = parseApp(userAgent)

    if (parsedApp) {
      return {
        appVersion: parsedApp.version,
      }
    }
  }

  return {}
}

export function useClientContext() {
  return useContext(ClientContext)
}
